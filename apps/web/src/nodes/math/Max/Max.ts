import { Node, Input, Output } from '@bitspace/circuit';
import { combineLatest, map } from 'rxjs';

import { NumberSchema } from '../../schemas';
import { NodeType } from '@prisma/client';

export class Max extends Node {
    static displayName = 'Max';
    static type = NodeType.MAX;

    inputs = {
        a: new Input({ name: 'A', type: NumberSchema(), defaultValue: 0 }),
        b: new Input({ name: 'B', type: NumberSchema(), defaultValue: 0 })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: NumberSchema(),
            observable: combineLatest([this.inputs.a, this.inputs.b]).pipe(
                map(([a, b]) => Math.max(a, b))
            )
        })
    };
}
