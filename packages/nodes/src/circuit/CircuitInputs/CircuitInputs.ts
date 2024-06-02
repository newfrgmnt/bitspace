import { NodeType } from '../../types';
import { Circuit, Output, Node } from '@bitspace/circuit';

export class CircuitInputs extends Node {
    /** Display Name */
    static displayName = 'Circuit Inputs';
    /** Node Type */
    static type = NodeType.CIRCUIT_INPUTS;

    /** Inputs */
    inputs = {};
    /** Outputs */
    outputs = {};

    constructor(circuit: Circuit) {
        super();

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
