import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { map } from 'rxjs';
import { HSVSchema } from '../AnalogousHarmony/AnalogousHarmony';

const NumberSchema = schema('Number', z.number());

export class HSV extends Node {
    static displayName = 'HSV';

    inputs = {
        color: new Input({
            name: 'Color',
            type: HSVSchema,
            defaultValue: {
                hue: 0,
                saturation: 0.5,
                value: 1
            }
        })
    };

    outputs = {
        hue: new Output({
            name: 'Hue',
            type: NumberSchema,
            observable: this.inputs.color.pipe(map(color => color.hue))
        }),
        saturation: new Output({
            name: 'Saturation',
            type: NumberSchema,
            observable: this.inputs.color.pipe(map(color => color.saturation))
        }),
        value: new Output({
            name: 'Value',
            type: NumberSchema,
            observable: this.inputs.color.pipe(map(color => color.value))
        })
    };
}
