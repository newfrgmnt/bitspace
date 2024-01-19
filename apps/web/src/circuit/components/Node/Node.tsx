/** @jsxImportSource @emotion/react */
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

import { NODE_POSITION_OFFSET_X } from '../../constants';
import { useHover } from '../../hooks/useHover/useHover';
import { StoreContext } from '../../stores/CircuitStore/CircuitStore';
import { fromCanvasCartesianPoint } from '../../utils/coordinates/coordinates';
import { Port } from '../Port/Port';
import { NodeActionProps, NodePortsProps, NodeProps } from './Node.types';
import clsx from 'clsx';

export const Node = observer(({ node, actions, window }: NodeProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const { onMouseEnter, onMouseLeave, isHovered } = useHover();
    const { store } = React.useContext(StoreContext);

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
                store.setNodePosition(selectedNode.id, {
                    x: (store.nodePositions.get(selectedNode.id)?.x || 0) + deltaX,
                    y: (store.nodePositions.get(selectedNode.id)?.y || 0) + -deltaY
                });
            }
        },
        [node]
    );

    const handleRemoveNode = React.useCallback(() => {
        node.dispose();

        store.removeNode(node.id);
    }, [node]);

    const active = store.selectedNodes?.indexOf(node) !== -1;
    const position = store.nodePositions.get(node.id) || { x: 0, y: 0 };

    const nodeWrapperClassNames = clsx(
        `absolute flex flex-col select-none rounded-2xl transition-shadow bg-slate-100 active:shadow-2xl border border-slate-50 focus:outline-none`,
        {
            'z-10': !active,
            'z-20': active,
            'shadow-xl': active
        }
    );

    const nodeHeaderWrapperClassNames = clsx(
        'flex flex-row justify-between items-center py-2 pl-3 pr-4 text-xxs font-medium uppercase tracking-widest rounded-t-xl border-b-2 handle',
        {
            'border-b-slate-200': !active,
            'border-b-blue-500': active,
            'text-blue-500': active
        }
    );

    const nodeActionsClassNames = clsx('flex flex-row nowrap gap-x-2 align-center transition-opacity', {
        'opacity-0': !(isHovered || active),
        'opacity-100': isHovered || active
    });

    const nodeContentWrapperClassNames = clsx(
        `flex flex-row justify-between items-start rounded-b-xl border-b-neutral-100`
    );

    return (
        <Draggable
            nodeRef={ref}
            position={fromCanvasCartesianPoint(position.x - NODE_POSITION_OFFSET_X, position.y)}
            onDrag={handleOnDrag}
            handle=".handle"
        >
            <div
                ref={ref}
                className={nodeWrapperClassNames}
                onClick={handleOnClick}
                onFocus={handleOnFocus}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                tabIndex={0}
            >
                <div className={nodeHeaderWrapperClassNames}>
                    <span>{node.name}</span>
                    <div className={nodeActionsClassNames}>
                        <NodeAction color="#ff4444" onClick={handleRemoveNode} />
                    </div>
                </div>
                {window ? <div className="relative flex flex-col" children={window} /> : undefined}
                <div className={nodeContentWrapperClassNames}>
                    <NodePorts ports={Object.values(node.inputs)} />
                    <NodePorts ports={Object.values(node.outputs)} isOutputWrapper={true} />
                </div>
            </div>
        </Draggable>
    );
});

const NodeAction = ({ color = '#fff', onClick }: NodeActionProps) => {
    return (
        <div
            className="opacity-100 transition-opacity ml-1.5 w-2 h-2 rounded-md bg-red-400 hover:opactiy-40"
            color={color}
            onClick={onClick}
        />
    );
};

const NodePorts = ({ ports, isOutputWrapper }: NodePortsProps) => {
    const nodePortsWrapperClassNames = clsx(
        'flex flex-col flex-grow p-3',
        isOutputWrapper ? 'items-end' : 'items-start'
    );
    return (
        <div className={nodePortsWrapperClassNames}>
            {ports.map(port => (
                <Port key={port.id} port={port} isOutput={!!isOutputWrapper} />
            ))}
        </div>
    );
};
