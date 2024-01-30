import { SerializedNode } from '../Node/Node.types';

export interface SerializedCircuit extends SerializedNode {
    nodes: SerializedNode[];
}
