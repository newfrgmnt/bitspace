import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { map } from 'rxjs';
import { HSVSchema } from '../ColorHarmonyNode/ColorHarmonyNode';
import { hsv2rgb } from '../../components/ColorPicker/ColorPicker.utils';

export const RGBSchema = schema(
    'RGB',
    z.object({
        red: z.number().min(0).max(1),
        green: z.number().min(0).max(1),
        blue: z.number().min(0).max(1)
    })
);

export class HSVRGBNode extends Node {
    name = 'HSV - RGB';

    inputs = {
        hsv: new Input({
            name: 'HSV',
            type: HSVSchema,
            defaultValue: {
                hue: 0,
                saturation: 1,
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
