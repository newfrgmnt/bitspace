import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';

import { NumberSchema } from '../../schemas';
import { NodeType } from '@prisma/client';

export class Round extends Node {
    static displayName = 'Round';
    static type = NodeType.ROUND;

    inputs = {
        input: new Input({ name: 'Input', type: NumberSchema, defaultValue: 0 })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: NumberSchema,
            observable: this.inputs.input.pipe(map(input => Math.round(input)))
        })
    };
}
