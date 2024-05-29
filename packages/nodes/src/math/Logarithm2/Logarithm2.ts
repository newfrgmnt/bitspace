import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';

import { NumberSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class Logarithm2 extends Node {
    static displayName = 'Logarithm 2';
    static type = NodeType.LOGARITHM2;

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
            observable: this.inputs.input.pipe(map(input => Math.log2(input)))
        })
    };
}
