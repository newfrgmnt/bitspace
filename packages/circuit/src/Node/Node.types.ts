import { SerializedInput } from '../Input/Input.types';
import { SerializedOutput } from '../Output/Output.types';
import { Node } from './Node';

export type NodeData = Record<string, any>;

export interface SerializedNode {
    id: string;
    name: string;
    displayName: string;
    data: NodeData;
    inputs: Record<string, SerializedInput>;
    outputs: Record<string, SerializedOutput>;
}

export interface NodeConstructor {
    new (): Node;
    displayName: string;
}
