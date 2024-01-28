import { Node } from '../Node/Node';
import { IInputProps } from '../Input/Input.types';
import { Input } from '../Input/Input';
import { Output } from '../Output/Output';
import { makeObservable, observable } from 'mobx';
import { schema } from '../Schema/Schema';
import { z } from 'zod';
import { Subject, Subscription } from 'rxjs';

const AnySchema = schema('Any', z.any());

export class Circuit extends Node {
    /** Display Name */
    static displayName = 'Circuit';

    /** Circuit Nodes */
    nodes: Node[] = [];
    /** Circuit Inputs */
    inputs: Record<string, Input> = {};
    /** Circuit Outputs */
    outputs = {
        output: new Output({
            name: 'Output',
            type: AnySchema,
            observable: new Subject()
        })
    };

    constructor() {
        super();

        makeObservable(this, {
            nodes: observable
        });

        this.addNode(new CircuitOutputNode(this));
    }

    /** Add Node to Circuit */
    public addNode(node: Node): this {
        this.nodes.push(node);

        return this;
    }

    /** Remove Node from Circuit */
    public removeNode(node: Node): this {
        this.nodes = this.nodes.filter(n => n.id !== node.id);

        return this;
    }

    /** Creates an Input on the Circuit */
    public createInput<T>(inputProps: IInputProps<T>): this {
        if (!inputProps.name) {
            throw new Error('An input name must be provided');
        }

        this.inputs[inputProps.name] = new Input(inputProps);

        return this;
    }
}

export class CircuitInputsNode extends Node {
    /** Display Name */
    static displayName = 'Circuit Inputs';

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

export class CircuitOutputNode extends Node {
    /** Display Name */
    static displayName = 'Circuit Output';
    /** Internal Circuit subscription */
    public subscription: Subscription;

    /** Inputs */
    inputs = {
        output: new Input({
            name: 'Output',
            type: AnySchema,
            defaultValue: undefined
        })
    };
    /** Outputs */
    outputs = {};

    constructor(circuit: Circuit) {
        super();

        this.subscription = this.inputs.output.subscribe(value => circuit.outputs.output.next(value));
    }

    public dispose(): void {
        super.dispose();

        this.subscription.unsubscribe();
    }
}
