import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';

import { NumberSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class SquareRoot extends Node {
    static displayName = 'SquareRoot';
    static type = NodeType.SQUARE_ROOT;

    inputs = {
        input: new Input({
            name: 'Input',
            type: NumberSchema(),
            defaultValue: 0
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: NumberSchema(),
            observable: this.inputs.input.pipe(map(input => Math.sqrt(input)))
        })
    };
}
