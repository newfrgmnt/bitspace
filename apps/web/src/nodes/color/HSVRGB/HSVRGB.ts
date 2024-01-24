import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { map } from 'rxjs';
import { HSVSchema } from '../AnalogousHarmony/AnalogousHarmony';
import { hsv2rgb } from '../../../components/ColorPicker/ColorPicker.utils';

export const RGBSchema = schema(
    'RGB',
    z.object({
        red: z.number().min(0).max(1.01),
        green: z.number().min(0).max(1.01),
        blue: z.number().min(0).max(1.01)
    })
);

export class HSVRGB extends Node {
    static displayName = 'HSV - RGB';

    inputs = {
        hsv: new Input({
            name: 'HSV',
            type: HSVSchema,
            defaultValue: {
                hue: 0,
                saturation: 0.5,
                value: 1
            }
        })
    };

    outputs = {
        rgb: new Output({
            name: 'RGB',
            type: RGBSchema,
            observable: this.inputs.hsv.pipe(
                map(color => hsv2rgb(color.hue, color.saturation, color.value)),
                map(([r, g, b]) => ({ red: r / 255, green: g / 255, blue: b / 255 }))
            )
        })
    };
}
