import { Node, Circuit, Input, Output } from '@bitspace/circuit';
import { AnySchema } from '@bitspace/schemas';
import { Subscription } from 'rxjs';
import { NodeType } from '../../types';

export class CircuitOutputs extends Node {
    /** Display Name */
    static displayName = 'Circuit Outputs';
    /** Node Type */
    static type = NodeType.CIRCUIT_OUTPUTS;
    /** Internal Circuit subscription */
    public subscription: Subscription;

    /** Inputs */
    inputs = {
        output: new Input({
            name: 'Output',
            type: AnySchema(),
            defaultValue: undefined
        })
    };
    /** Outputs */
    outputs: Record<string, Output> = {};

    constructor(circuit: Circuit) {
        super();

        this.subscription = this.inputs.output.subscribe(
            circuit.outputs.output
        );
    }

    public dispose(): void {
        this.subscription.unsubscribe();

        super.dispose();
    }
}
