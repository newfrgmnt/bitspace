import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Canvas } from '../../components/Canvas/Canvas';
import { Connection } from '../../components/Connection/Connection';
import { Node } from '../../components/Node/Node';
import { CIRCUIT_SIZE, NODE_CENTER } from '../../constants';
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
import { DraggableEventHandler } from 'react-draggable';
import { PutBlobResult } from '@vercel/blob';
import { createNode } from '@/server/mutations/createNode';
import { Image } from '@bitspace/nodes/primitives';
import { toCanvasCartesianPoint } from '@/circuit/utils/coordinates/coordinates';

const Nodes = observer(
    ({
        windowResolver,
        onNodeMoveStop
    }: {
        windowResolver?: NodeWindowResolver;
        onNodeMoveStop?: DraggableEventHandler;
    }) => {
        const { store } = React.useContext(StoreContext);

        return (
            <>
                {store.circuit.nodes.map(node => (
                    <Node
                        key={node.id}
                        node={node}
                        window={windowResolver?.(node)}
                        onMoveStop={onNodeMoveStop}
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
            className="z-30 absolute top-0 left-0 rounded-xl bg-white/50"
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
        onNodeMoveStop,
        onSelectionChanged
    }: CircuitProps) => {
        useKeyboardActions(store);

        const { onMouseDown, onMouseMove, onScroll, onUploadFile } =
            useCircuitHelpers(store, {
                onConnection,
                onConnectionRemoval,
                onNodeRemoval,
                onSelectionChanged
            });

        const uploadFile = useUploadFile(onUploadFile);

        return (
            <Canvas
                className={clsx('absolute inset-0 w-full h-full', className)}
                size={{ width: CIRCUIT_SIZE, height: CIRCUIT_SIZE }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onScroll={onScroll}
                onDrop={uploadFile}
            >
                <Nodes
                    windowResolver={nodeWindowResolver}
                    onNodeMoveStop={onNodeMoveStop}
                />
                <Connections />
                <Selection />
            </Canvas>
        );
    }
);

const useCircuitHelpers = (
    store: CanvasStore,
    {
        onConnection,
        onConnectionRemoval,
        onNodeRemoval,
        onSelectionChanged
    }: Pick<
        CircuitProps,
        | 'onConnection'
        | 'onConnectionRemoval'
        | 'onNodeRemoval'
        | 'onSelectionChanged'
    >
) => {
    const onMouseUp = React.useCallback(() => {
        store.setDraftConnectionSource(null);
        store.setSelectionBounds(null);
    }, []);

    React.useEffect(() => {
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [store, onMouseUp]);

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
            () => store.circuit.connections,
            (connections, prevConnections) => {
                const removedConnections = prevConnections.filter(
                    node => !connections.includes(node)
                );

                if (removedConnections.length && onConnectionRemoval) {
                    for (const connection of removedConnections) {
                        onConnectionRemoval(connection);
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

    const onUploadFile = React.useCallback(
        async (blobRequest: Promise<Response>) => {
            const node = new Image();
            node.outputs.output.setLoading();

            node.position = toCanvasCartesianPoint(
                store.canvasMidpoint.x - NODE_CENTER,
                store.canvasMidpoint.y - 200
            );
            store.circuit.addNode(node);
            store.selectNodes([node]);

            const blob = (await (await blobRequest).json()) as PutBlobResult;

            node.outputs.output.resetLoading();
            node.inputs.source.next(blob.url);

            createNode({
                id: node.id,
                name: node.name,
                type: node.type,
                parentId: store.circuit.id,
                position: {
                    create: {
                        x: node.position.x,
                        y: node.position.y
                    }
                },
                inputs: {
                    createMany: {
                        data: Object.entries(node.inputs).map(
                            ([key, input]) => ({
                                id: input.id,
                                key,
                                value:
                                    typeof input.value !== 'function'
                                        ? input.value
                                        : undefined
                            })
                        )
                    }
                },
                outputs: {
                    createMany: {
                        data: Object.entries(node.outputs).map(
                            ([key, output]) => ({ id: output.id, key })
                        )
                    }
                }
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

    return { onScroll, onMouseMove, onMouseDown, onUploadFile };
};
