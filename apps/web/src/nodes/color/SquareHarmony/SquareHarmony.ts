import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';
import { harmonies } from '../../../components/ColorPicker/ColorPicker.utils';
import { HSVSchema } from '../../../schemas/HSVSchema';
import { NodeType } from '@prisma/client';

export class SquareHarmony extends Node {
    static displayName = 'Square Harmony';
    static type = NodeType.SQUARE_COLOR;

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
                    const [a] = harmonies.square;

                    return { hue: this.rotate(hue, a), saturation, value };
                })
            )
        }),
        c: new Output({
            name: 'C',
            type: HSVSchema,
            observable: this.inputs.color.pipe(
                map(color => {
                    const { hue, saturation, value } = color;
                    const [_, b] = harmonies.square;

                    return { hue: this.rotate(hue, b), saturation, value };
                })
            )
        }),
        d: new Output({
            name: 'D',
            type: HSVSchema,
            observable: this.inputs.color.pipe(
                map(color => {
                    const { hue, saturation, value } = color;
                    const [_, __, c] = harmonies.square;

                    return { hue: this.rotate(hue, c), saturation, value };
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
