import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';

import { NumberSchema } from '../../schemas';
import { NodeType } from '@prisma/client';

export class Sine extends Node {
    static displayName = 'Sine';
    static type = NodeType.SINE;

    inputs = {
        input: new Input({ name: 'Input', type: NumberSchema, defaultValue: 0 })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: NumberSchema,
            observable: this.inputs.input.pipe(map(input => Math.sin(input)))
        })
    };
}
