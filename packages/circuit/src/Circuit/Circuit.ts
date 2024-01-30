import { Node } from '../Node/Node';
import { IInputProps } from '../Input/Input.types';
import { Input } from '../Input/Input';
import { Output } from '../Output/Output';
import { makeObservable, observable } from 'mobx';
import { schema } from '../Schema/Schema';
import { z } from 'zod';
import { Subject, Subscription } from 'rxjs';
import { SerializedCircuit } from './Circuit.types';
import { NodeConstructor } from '../Node/Node.types';

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

    /** Restores a Circuit from JSON */
    public static from(serializedCircuit: SerializedCircuit, nodeCollection: NodeConstructor[]): Circuit {
        const circuit = new Circuit();

        circuit.id = serializedCircuit.id;
        circuit.name = serializedCircuit.name;
        circuit.data = serializedCircuit.data;

        const connectionCache = new Map<Output['id'], Input<any>['id']>();
        const portCache = new Map<Input['id'] | Output['id'], Input<any> | Output<any>>();

        for (const serializedNode of serializedCircuit.nodes) {
            const nodeConstructor = nodeCollection.find(
                nodeConstructor => nodeConstructor.displayName === serializedNode.displayName
            );

            if (!nodeConstructor) continue;

            const node =
                nodeConstructor.displayName === 'Circuit'
                    ? Circuit.from(serializedNode as SerializedCircuit, nodeCollection)
                    : /** @ts-ignore */
                      new nodeConstructor(circuit);

            node.id = serializedNode.id;
            node.name = serializedNode.name;
            node.data = serializedNode.data;

            for (const [outputName, serializedOutput] of Object.entries(serializedNode.outputs)) {
                const output = node.outputs[outputName];

                if (output) {
                    output.id = serializedOutput.id;
                    output.name = serializedOutput.name;

                    portCache.set(output.id, output);

                    for (const serializedConnection of serializedOutput.connections) {
                        connectionCache.set(serializedConnection.from, serializedConnection.to);
                    }
                }
            }

            for (const [inputName, serializedInput] of Object.entries(serializedNode.inputs)) {
                const input = node.inputs[inputName];

                if (input) {
                    input.id = serializedInput.id;
                    input.name = serializedInput.name;

                    portCache.set(input.id, input);
                }
            }

            circuit.addNode(node);
        }

        for (const [outputId, inputId] of connectionCache.entries()) {
            const output = portCache.get(outputId);
            const input = portCache.get(inputId);

            if (output && input) {
                (output as Output).connect(input as Input);
            }
        }

        return circuit;
    }

    constructor() {
        super();

        makeObservable(this, {
            nodes: observable
        });
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

    /** Serializes Circuit */
    public toJSON() {
        return {
            ...super.toJSON(),
            nodes: this.nodes
        };
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
