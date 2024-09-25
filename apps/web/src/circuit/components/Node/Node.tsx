/** @jsxImportSource @emotion/react */
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

import { NODE_POSITION_OFFSET_X } from '../../constants';
import { useHover } from '../../hooks/useHover/useHover';
import { StoreContext } from '../../stores/CanvasStore/CanvasStore';
import { fromCanvasCartesianPoint } from '../../utils/coordinates/coordinates';
import { Port } from '../Port/Port';
import { NodeActionProps, NodePortsProps, NodeProps } from './Node.types';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Circuit } from '@bitspace/circuit';
import { useRouter } from 'next/navigation';
import { get } from 'mobx';
import { Spinner } from '@/components/Spinner/Spinner';
import { NodeType, Shader } from '@bitspace/nodes';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/Modal/Modal';

export const Node = observer(
    ({ node, actions, window, onMoveStop }: NodeProps) => {
        const ref = React.useRef<HTMLDivElement>(null);
        const { onMouseEnter, onMouseLeave, isHovered } = useHover();
        const { store } = React.useContext(StoreContext);
        const router = useRouter();

        const { isShown, show, hide } = useModal();

        const [windowActive, setWindowActive] = React.useState(false);

        const nodeLoading = Object.values(node.outputs).some(output =>
            get(output, 'loading')
        );

        React.useEffect(() => {
            if (ref.current) {
                const observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            setWindowActive(entry.isIntersecting);
                        });
                    },
                    { threshold: 0 }
                );

                observer.observe(ref.current);

                return () => {
                    observer.disconnect();
                };
            }
        }, []);

        React.useEffect(() => {
            if (ref.current) {
                store.setNodeElement(node.id, ref.current);

                return () => {
                    store.removeNodeElement(node.id);
                };
            }
        }, [ref]);

        const handleOnClick = React.useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!store.selectedNodes?.includes(node)) {
                    store.selectNodes([node]);
                }
            },
            [node]
        );

        const handleOnFocus = React.useCallback(() => {
            if (!store.selectedNodes?.includes(node)) {
                store.selectNodes([node]);
            }
        }, [node]);

        const handleOnDrag: DraggableEventHandler = React.useCallback(
            (e, { deltaX, deltaY }) => {
                e.preventDefault();
                e.stopPropagation();

                for (const selectedNode of store.selectedNodes || []) {
                    selectedNode.incrementPosition(deltaX, -deltaY);
                }
            },
            [node]
        );

        const handleRemoveNode = React.useCallback(() => {
            node.dispose();

            store.removeNode(node);
        }, [node, store]);

        const handleDoubleClick: React.MouseEventHandler<HTMLDivElement> =
            React.useCallback(() => {
                if (node instanceof Circuit) {
                    router.push(`/circuit/${store.circuit.id}/${node.id}`);
                }
            }, [node, store]);

        const active = store.selectedNodes?.indexOf(node) !== -1;
        const position = node.position || { x: 0, y: 0 };

        const nodeWrapperClassNames = clsx(
            `absolute flex flex-col select-none focus:outline-none w-[260px] bg-[#fcfdff] border-white border rounded-3xl transition-shadow active:shadow-2xl opacity-100`,
            {
                'z-10': !active,
                'z-20': active,
                'shadow-2xl': active
            }
        );

        const nodeLoadingClassNames = clsx(
            'absolute left-5 top-5 flex flex-row '
        );

        const nodeHeaderWrapperClassNames = clsx(
            'relative flex flex-row justify-center items-center px-4 pt-4 text-xs font-medium rounded-t-xl handle',
            {
                'text-black': active
            }
        );

        const nodeActionsClassNames = clsx(
            'absolute right-5 top-5 flex flex-row nowrap gap-x-2 items-center transition-opacity',
            {
                'opacity-0': !(isHovered || active),
                'opacity-100': isHovered || active
            }
        );

        const nodeContentWrapperClassNames = clsx(
            `flex flex-row justify-between items-start rounded-b-xl border-b-slate-100`,
            {
                'mt-4': !window
            }
        );

        return (
            <Draggable
                nodeRef={ref}
                position={fromCanvasCartesianPoint(
                    position.x - NODE_POSITION_OFFSET_X,
                    position.y
                )}
                onDrag={handleOnDrag}
                onStop={onMoveStop}
            >
                <motion.div
                    ref={ref}
                    className={nodeWrapperClassNames}
                    onClick={handleOnClick}
                    onFocus={handleOnFocus}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onDoubleClick={handleDoubleClick}
                    tabIndex={0}
                    variants={{
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1,
                            transition: {
                                duration: 1.5,
                                ease: [0.75, 0, 0.25, 1]
                            }
                        }
                    }}
                >
                    <div className={nodeHeaderWrapperClassNames}>
                        <div className={nodeLoadingClassNames}>
                            {nodeLoading && (
                                <Spinner className="border-slate-300 !h-3 !w-3" />
                            )}
                        </div>
                        {/** @ts-ignore */}
                        <span>{node.constructor.displayName}</span>
                        <div className={nodeActionsClassNames}>
                            {node instanceof Shader && (
                                <>
                                    <NodeAction
                                        color="bg-yellow-400"
                                        onClick={() => show()}
                                    />
                                    <Modal
                                        hide={hide}
                                        isShown={isShown}
                                        modalContent={
                                            <FragmentEditor node={node} />
                                        }
                                    />
                                </>
                            )}
                            <NodeAction
                                color="bg-red-400"
                                onClick={handleRemoveNode}
                            />
                        </div>
                    </div>
                    {windowActive && window}
                    <div className={nodeContentWrapperClassNames}>
                        <NodePorts
                            ports={Object.values(node.inputs)}
                            windowActive={windowActive}
                        />
                        <NodePorts
                            windowActive={windowActive}
                            ports={Object.values(node.outputs)}
                            isOutputWrapper={true}
                        />
                    </div>
                </motion.div>
            </Draggable>
        );
    }
);

const NodeAction = ({ color = '#fff', onClick }: NodeActionProps) => {
    return (
        <div
            className={clsx(
                'opacity-100 transition-opacity w-2.5 h-2.5 rounded-md hover:opactiy-40',
                color
            )}
            onClick={onClick}
        />
    );
};

const NodePorts = observer(
    ({ ports, isOutputWrapper, windowActive }: NodePortsProps) => {
        const nodePortsWrapperClassNames = clsx(
            'flex flex-col flex-grow px-4 pb-5',
            isOutputWrapper ? 'items-end' : 'items-start'
        );
        return (
            <div className={nodePortsWrapperClassNames}>
                {ports.map(port => (
                    <Port
                        key={port.id}
                        port={port}
                        isOutput={!!isOutputWrapper}
                        windowActive={windowActive}
                    />
                ))}
            </div>
        );
    }
);

export const NodeWindow = ({
    children,
    className
}: React.PropsWithChildren<{ className?: string }>) => {
    return (
        <div
            className={clsx(
                'relative flex flex-col m-4 rounded-3xl overflow-hidden bg-slate-100 max-h-[226px] h-full',
                className
            )}
            onMouseDown={e => e.stopPropagation()}
        >
            {children}
        </div>
    );
};

const FragmentEditor = ({ node }: { node: Shader }) => {
    const [fragment, setFragment] = React.useState('');

    React.useEffect(() => {
        const subscription = node.$fragmentShader.subscribe(setFragment);

        return () => {
            subscription.unsubscribe();
        };
    }, [node]);

    return (
        <div className="flex flex-col p-12 min-h-96">
            <textarea
                className="bg-slate-100 p-4 h-full rounded-2xl font-mono text-sm"
                value={fragment}
                onKeyDown={e => {
                    e.stopPropagation();
                }}
                onChange={e => {
                    e.stopPropagation();
                    setFragment(e.target.value);
                }}
                onBlur={e => {
                    node.$fragmentShader.next(fragment);
                }}
            />
        </div>
    );
};
