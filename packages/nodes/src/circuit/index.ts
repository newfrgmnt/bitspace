import { Circuit } from '@bitspace/circuit';
import { NodeType } from '../types';
import { CircuitInputs } from './CircuitInputs/CircuitInputs';
import { CircuitOutputs } from './CircuitOutputs/CircuitOutputs';

export const CircuitNodes = [CircuitInputs, CircuitOutputs].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type CircuitNode = CircuitInputs | CircuitOutputs;

export interface CircuitNodeConstructor {
    new (circuit: Circuit): CircuitNode;
    type: NodeType;
}

export { CircuitInputs, CircuitOutputs };
