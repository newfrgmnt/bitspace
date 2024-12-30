import { Node } from '../Node/Node';
import { IInputProps } from '../Input/Input.types';
import { Input } from '../Input/Input';
import { Output } from '../Output/Output';
import { z } from 'zod';
import { Subject } from 'rxjs';

const AnySchema = () => z.any().describe('Any');

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
            type: AnySchema(),
            observable: new Subject()
        })
    };

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

    /** Dispose all Circuit resources */
    public dispose(): void {
        for (const node of this.nodes) {
            node.dispose();
        }

        super.dispose();
    }
}
