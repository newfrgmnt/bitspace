import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Canvas } from '../../components/Canvas/Canvas';
import { Connection } from '../../components/Connection/Connection';
import { Node } from '../../components/Node/Node';
import { CIRCUIT_SIZE } from '../../constants';
import { useKeyboardActions } from '../../hooks/useKeyboardActions/useKeyboardActions';
import {
    CanvasStore,
    StoreContext
} from '../../stores/CanvasStore/CanvasStore';
import { normalizeBounds } from '../../utils/bounds/bounds';
import { CircuitProps, NodeWindowResolver } from './Circuit.types';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useUploadFile } from '../../hooks/useDropzone/useDropzone';

const Nodes = observer(
    ({ windowResolver }: { windowResolver?: NodeWindowResolver }) => {
        const { store } = React.useContext(StoreContext);

        return (
            <>
                {store.circuit.nodes.map(node => (
                    <Node
                        key={node.id}
                        node={node}
                        window={windowResolver?.(node)}
                    />
                ))}
            </>
        );
    }
);

const Connections = observer(() => {
    const ref = React.useRef<SVGSVGElement>(null);
    const { store } = React.useContext(StoreContext);

    const onMouseDown = React.useCallback(
        (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            if (ref.current === e.target) {
                store.selectNodes([]);
            }
        },
        []
    );

    return (
        <motion.svg
            ref={ref}
            id="connections"
            width="100%"
            height="100%"
            onMouseDown={onMouseDown}
            animate="animate"
            initial="initial"
            transition={{ staggerChildren: 0.3, delayChildren: 1.5 }}
        >
            {store.connections.map(connection => (
                <Connection key={connection.id} connection={connection} />
            ))}

            {store.draftConnectionSource && (
                <Connection output={store.draftConnectionSource} />
            )}
        </motion.svg>
    );
});

const Selection = observer(() => {
    const { store } = React.useContext(StoreContext);

    const { width, height, x, y } = normalizeBounds(
        store.selectionBounds || { width: 0, height: 0, x: 0, y: 0 }
    );

    return store.selectionBounds ? (
        <div
            className="z-30 absolute top-0 left-0 border-2 border-slate-300 rounded-lg bg-white/50"
            style={{ width, height, transform: `translate(${x}px, ${y}px)` }}
        />
    ) : null;
});

export const Circuit = observer(
    ({
        className,
        store,
        nodeWindowResolver,
        onConnection,
        onConnectionRemoval,
        onNodeRemoval,
        onSelectionChanged
    }: CircuitProps) => {
        useKeyboardActions(store);

        const { onMouseDown, onMouseMove, onMouseUp, onScroll } =
            useCircuitHelpers(store);

        const uploadFile = useUploadFile();

        React.useEffect(() => {
            return reaction(
                () => store.connections,
                (connections, prevConnections) => {
                    const addedConnections = connections.filter(
                        connection => !prevConnections.includes(connection)
                    );
                    const removedConnections = prevConnections.filter(
                        connection => !connections.includes(connection)
                    );

                    if (addedConnections.length && onConnection) {
                        for (const connection of addedConnections) {
                            onConnection(connection);
                        }
                    }

                    if (removedConnections.length && onConnectionRemoval) {
                        for (const connection of removedConnections) {
                            onConnectionRemoval(connection);
                        }
                    }
                }
            );
        }, [onConnection, onConnectionRemoval, store]);

        React.useEffect(() => {
            return reaction(
                () => store.circuit.nodes,
                (nodes, prevNodes) => {
                    const removedNodes = prevNodes.filter(
                        node => !nodes.includes(node)
                    );

                    if (removedNodes.length && onNodeRemoval) {
                        for (const node of removedNodes) {
                            onNodeRemoval(node);
                        }
                    }
                }
            );
        }, [onNodeRemoval, store]);

        React.useEffect(() => {
            return reaction(
                () => store.selectedNodes,
                selectedNodes => {
                    onSelectionChanged?.(selectedNodes);
                }
            );
        }, [onSelectionChanged, store]);

        return (
            <Canvas
                className={clsx('absolute inset-0 w-full h-full', className)}
                size={{ width: CIRCUIT_SIZE, height: CIRCUIT_SIZE }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onScroll={onScroll}
                onDrop={uploadFile}
            >
                <Nodes windowResolver={nodeWindowResolver} />
                <Connections />
                <Selection />
            </Canvas>
        );
    }
);

const useCircuitHelpers = (store: CanvasStore) => {
    const onScroll = React.useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            if (!(e.target instanceof HTMLDivElement)) {
                return;
            }

            store.setCanvasPosition({
                x: e.target.scrollLeft,
                y: e.target.scrollTop
            });
        },
        [store]
    );

    const onMouseMove = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.nativeEvent.clientX - rect.left;
            const y = e.nativeEvent.clientY - rect.top;

            store.setMousePosition({ x, y });

            if (store.selectionBounds) {
                const { x, y, width, height } = store.selectionBounds;

                const bounds = {
                    x,
                    y,
                    width: width + e.movementX,
                    height: height + e.movementY
                };

                store.setSelectionBounds(bounds);
            }
        },
        []
    );

    const onMouseDown = React.useCallback(
        ({ nativeEvent }: React.MouseEvent<HTMLDivElement>) => {
            if ((nativeEvent.target as HTMLDivElement).id === 'connections') {
                store.setSelectionBounds({
                    x: store.mousePosition.x,
                    y: store.mousePosition.y,
                    width: 0,
                    height: 0
                });
            }
        },
        []
    );

    const onMouseUp = React.useCallback(() => {
        store.setDraftConnectionSource(null);
        store.setSelectionBounds(null);
    }, []);

    return { onScroll, onMouseMove, onMouseDown, onMouseUp };
};
