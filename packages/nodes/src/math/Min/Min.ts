import { Node, Input, Output } from '@bitspace/circuit';
import { combineLatest, map } from 'rxjs';

import { NumberSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class Min extends Node {
    static displayName = 'Min';
    static type = NodeType.MIN;

    inputs = {
        a: new Input({ name: 'A', type: NumberSchema(), defaultValue: 0 }),
        b: new Input({ name: 'B', type: NumberSchema(), defaultValue: 0 })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: NumberSchema(),
            observable: combineLatest([this.inputs.a, this.inputs.b]).pipe(
                map(([a, b]) => Math.min(a, b))
            )
        })
    };
}
