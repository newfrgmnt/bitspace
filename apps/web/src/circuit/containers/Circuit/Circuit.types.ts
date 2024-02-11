import { Connection, Node } from '@bitspace/circuit';

import { CanvasStore } from '../../stores/CanvasStore/CanvasStore';

export type NodeWindowResolver = (node: Node) => JSX.Element | undefined;

export type CircuitProps = {
    store: CanvasStore;
    className?: string;
    nodeWindowResolver?: NodeWindowResolver;
    onNodeRemoval?(node: Node): void;
    onConnection?(connection: Connection<unknown>): void;
    onConnectionRemoval?(connection: Connection<unknown>): void;
    onSelectionChanged?(nodes: Node[]): void;
};
