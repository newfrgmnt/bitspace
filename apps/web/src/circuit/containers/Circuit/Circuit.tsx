/** @jsxImportSource @emotion/react */
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Canvas } from '../../components/Canvas/Canvas';
import { Connection } from '../../components/Connection/Connection';
import { Node } from '../../components/Node/Node';
import { CIRCUIT_SIZE } from '../../constants';
import { useKeyboardActions } from '../../hooks/useKeyboardActions/useKeyboardActions';
import { StoreContext } from '../../stores/CircuitStore/CircuitStore';
import { normalizeBounds } from '../../utils/bounds/bounds';
import { CircuitProps, NodeWindowResolver } from './Circuit.types';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Nodes = observer(({ windowResolver }: { windowResolver?: NodeWindowResolver }) => {
    const { store } = React.useContext(StoreContext);

    return (
        <>
            {store.circuit.nodes.map(node => (
                <Node key={node.id} node={node} window={windowResolver?.(node)} />
            ))}
        </>
    );
});

const Connections = observer(() => {
    const ref = React.useRef<SVGSVGElement>(null);
    const { store } = React.useContext(StoreContext);

    const onMouseDown = React.useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (ref.current === e.target) {
            store.selectNodes([]);
        }
    }, []);

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

            {store.draftConnectionSource && <Connection output={store.draftConnectionSource} />}
        </motion.svg>
    );
});

const Selection = observer(() => {
    const { store } = React.useContext(StoreContext);

    const { width, height, x, y } = normalizeBounds(store.selectionBounds || { width: 0, height: 0, x: 0, y: 0 });

    return store.selectionBounds ? (
        <div
            className="z-30 absolute top-0 left-0 border-2 border-slate-300 rounded-lg bg-white/50"
            style={{ width, height, transform: `translate(${x}px, ${y}px)` }}
        />
    ) : null;
});

export const Circuit = observer(
    React.forwardRef<HTMLDivElement, CircuitProps>((props, ref) => {
        useKeyboardActions(props.store);

        const onScroll = React.useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                if (!(e.target instanceof HTMLDivElement)) {
                    return;
                }

                props.store.setViewportPosition({
                    x: e.target.scrollLeft,
                    y: e.target.scrollTop
                });
            },
            [props]
        );

        const onMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.nativeEvent.clientX - rect.left;
            const y = e.nativeEvent.clientY - rect.top;

            props.store.setMousePosition({ x, y });

            if (props.store.selectionBounds) {
                const { x, y, width, height } = props.store.selectionBounds;

                const bounds = {
                    x,
                    y,
                    width: width + e.movementX,
                    height: height + e.movementY
                };

                props.store.setSelectionBounds(bounds);
            }
        }, []);

        const onMouseDown = React.useCallback(({ nativeEvent }: React.MouseEvent<HTMLDivElement>) => {
            if ((nativeEvent.target as HTMLDivElement).id === 'connections') {
                props.store.setSelectionBounds({
                    x: props.store.mousePosition.x,
                    y: props.store.mousePosition.y,
                    width: 0,
                    height: 0
                });
            }
        }, []);

        const onMouseUp = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            props.store.setDraftConnectionSource(null);
            props.store.setSelectionBounds(null);
        }, []);

        React.useEffect(() => {
            return reaction(
                () => props.store.connections,
                (connections, prevConnections) => {
                    const addedConnections = connections.filter(connection => !prevConnections.includes(connection));
                    const removedConnections = prevConnections.filter(connection => !connections.includes(connection));

                    if (addedConnections.length && props.onConnection) {
                        for (const connection of addedConnections) {
                            props.onConnection(connection);
                        }
                    }

                    if (removedConnections.length && props.onConnectionRemoval) {
                        for (const connection of removedConnections) {
                            props.onConnectionRemoval(connection);
                        }
                    }
                }
            );
        }, [props]);

        React.useEffect(() => {
            return reaction(
                () => props.store.circuit.nodes,
                (nodes, prevNodes) => {
                    const removedNodes = prevNodes.filter(node => !nodes.includes(node));

                    if (removedNodes.length && props.onNodeRemoval) {
                        for (const node of removedNodes) {
                            props.onNodeRemoval(node);
                        }
                    }
                }
            );
        }, [props]);

        React.useEffect(() => {
            return reaction(
                () => props.store.selectedNodes,
                (selectedNodes, prevSelectedNodes) => {
                    props.onSelectionChanged?.(selectedNodes);
                }
            );
        }, [props]);

        return (
            <Canvas
                ref={ref}
                className={clsx('fixed top-0 left-0 w-full h-full', props.className)}
                size={{ width: CIRCUIT_SIZE, height: CIRCUIT_SIZE }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onScroll={onScroll}
            >
                <Nodes windowResolver={props.nodeWindowResolver} />
                <Connections />
                <Selection />
            </Canvas>
        );
    })
);
