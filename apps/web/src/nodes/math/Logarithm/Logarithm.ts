import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';

import { NumberSchema } from '../../../schemas/NumberSchema';

export class Logarithm extends Node {
    static displayName = 'Logarithm';

    inputs = {
        input: new Input({ name: 'Input', type: NumberSchema, defaultValue: 0 })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: NumberSchema,
            observable: this.inputs.input.pipe(map(input => Math.log(input)))
        })
    };
}
