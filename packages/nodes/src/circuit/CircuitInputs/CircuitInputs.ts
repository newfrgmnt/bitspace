import { NodeType } from '../../types';
import { Circuit, Output, Node, Input } from '@bitspace/circuit';

export class CircuitInputs extends Node {
    /** Display Name */
    static displayName = 'Circuit Inputs';
    /** Node Type */
    static type = NodeType.CIRCUIT_INPUTS;

    /** Inputs */
    inputs: Record<string, Input> = {};
    /** Outputs */
    outputs: Record<string, Output> = {};

    constructor(circuit: Circuit) {
        super();

        // @ts-ignore
        this.outputs = [...Object.values(circuit.inputs)].map(input => {
            const output = new Output({
                name: input.name,
                type: input.type,
                observable: input.asObservable()
            });

            return output;
        });
    }
}
