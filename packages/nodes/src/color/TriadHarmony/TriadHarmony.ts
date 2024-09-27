import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';
import { harmonies } from '../../../../../apps/web/src/components/ColorPicker/ColorPicker.utils';
import { ColorSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class TriadHarmony extends Node {
    static displayName = 'Triad Harmony';
    static type = NodeType.TRIAD_COLOR;

    inputs = {
        color: new Input({
            name: 'Color',
            type: ColorSchema(),
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
            type: ColorSchema(),
            observable: this.inputs.color
        }),
        b: new Output({
            name: 'B',
            type: ColorSchema(),
            observable: this.inputs.color.pipe(
                map(color => {
                    const { hue, saturation, value } = color;

                    const [a] = harmonies.triad;

                    return { hue: this.rotate(hue, a), saturation, value };
                })
            )
        }),
        c: new Output({
            name: 'C',
            type: ColorSchema(),
            observable: this.inputs.color.pipe(
                map(color => {
                    const { hue, saturation, value } = color;
                    const [_, b] = harmonies.triad;

                    return {
                        hue: this.rotate(hue, b),
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
