import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { combineLatest, map } from 'rxjs';
import { HSVSchema } from '../AnalogousHarmony/AnalogousHarmony';

const NumberSchema = schema('Number', z.number());

export class ToHSV extends Node {
    static displayName = 'To HSV';

    inputs = {
        hue: new Input({
            name: 'Hue',
            type: NumberSchema,
            defaultValue: 0
        }),
        saturation: new Input({
            name: 'Saturation',
            type: NumberSchema,
            defaultValue: 0.5
        }),
        value: new Input({
            name: 'Value',
            type: NumberSchema,
            defaultValue: 1
        })
    };

    outputs = {
        color: new Output({
            name: 'Color',
            type: HSVSchema,
            observable: combineLatest([this.inputs.hue, this.inputs.saturation, this.inputs.value]).pipe(
                map(([hue, saturation, value]) => ({ hue: Math.abs(hue % 360), saturation, value }))
            )
        })
    };
}
