import { Node, Input, Output } from '@bitspace/circuit';
import { combineLatest, map } from 'rxjs';

import { NumberSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class Round extends Node {
    static displayName = 'Round';
    static type = NodeType.ROUND;

    inputs = {
        input: new Input({
            name: 'Input',
            type: NumberSchema(),
            defaultValue: 0
        }),
        decimals: new Input({
            name: 'Decimals',
            type: NumberSchema(),
            defaultValue: 0
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: NumberSchema(),
            observable: combineLatest([
                this.inputs.input,
                this.inputs.decimals
            ]).pipe(
                map(([input, decimals]) =>
                    decimals === 0
                        ? Math.round(input)
                        : Number(input.toFixed(decimals))
                )
            )
        })
    };
}
