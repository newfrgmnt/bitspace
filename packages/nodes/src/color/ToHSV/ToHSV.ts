import { Node, Input, Output } from '@bitspace/circuit';
import { combineLatest, map } from 'rxjs';
import { HSVSchema, NumberSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class ToHSV extends Node {
    static displayName = 'To HSV';
    static type = NodeType.TO_HSV;

    inputs = {
        hue: new Input({
            name: 'Hue',
            type: NumberSchema(0, 360, true),
            defaultValue: 0
        }),
        saturation: new Input({
            name: 'Saturation',
            type: NumberSchema(0, 1),
            defaultValue: 0.5
        }),
        value: new Input({
            name: 'Value',
            type: NumberSchema(0, 1),
            defaultValue: 1
        })
    };

    outputs = {
        color: new Output({
            name: 'Color',
            type: HSVSchema(),
            observable: combineLatest([
                this.inputs.hue,
                this.inputs.saturation,
                this.inputs.value
            ]).pipe(
                map(([hue, saturation, value]) => ({
                    hue: Math.abs(hue % 360),
                    saturation,
                    value
                }))
            )
        })
    };
}
