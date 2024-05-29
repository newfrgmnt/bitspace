import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';

import { NumberSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class Absolute extends Node {
    static displayName = 'Absolute';
    static type = NodeType.ABSOLUTE;

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
            observable: this.inputs.input.pipe(map(input => Math.abs(input)))
        })
    };
}
