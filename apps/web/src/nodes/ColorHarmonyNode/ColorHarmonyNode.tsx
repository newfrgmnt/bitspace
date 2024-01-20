import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { map } from 'rxjs';

export const HSVSchema = schema(
    'HSV',
    z.object({
        hue: z.number().min(0).max(360.01),
        saturation: z.number().min(0).max(1.01),
        value: z.number().min(0).max(1.01)
    })
);

export class ColorHarmony extends Node {
    name = 'Color Harmony';

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
        a: new Output({
            name: 'A',
            type: HSVSchema,
            observable: this.inputs.color
        }),
        b: new Output({
            name: 'B',
            type: HSVSchema,
            observable: this.inputs.color.pipe(
                map(color => {
                    const { hue, saturation, value } = color;

                    return { hue: this.rotate(hue, -120), saturation, value };
                })
            )
        }),
        c: new Output({
            name: 'C',
            type: HSVSchema,
            observable: this.inputs.color.pipe(
                map(color => {
                    const { hue, saturation, value } = color;

                    return {
                        hue: this.rotate(hue, 120),
                        saturation,
                        value
                    };
                })
            )
        })
    };

    rotate(hue: number, degrees: number) {
        hue += degrees;
        if (hue > 360) {
            hue -= 360;
        } else if (hue < 0) {
            hue += 360;
        }

        return hue;
    }
}
