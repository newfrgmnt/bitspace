import { Node, Input, Output } from '@bitspace/circuit';
import { combineLatest, map } from 'rxjs';

import { NumberSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class Power extends Node {
    static displayName = 'Power';
    static type = NodeType.POWER;

    inputs = {
        x: new Input({ name: 'X', type: NumberSchema(), defaultValue: 0 }),
        y: new Input({ name: 'Y', type: NumberSchema(), defaultValue: 0 })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: NumberSchema(),
            observable: combineLatest([this.inputs.x, this.inputs.y]).pipe(
                map(([x, y]) => Math.pow(x, y))
            )
        })
    };
}
