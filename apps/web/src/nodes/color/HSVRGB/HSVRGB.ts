import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';
import { hsv2rgb } from '../../../components/ColorPicker/ColorPicker.utils';
import { HSVSchema } from '../../../schemas/HSVSchema';
import { RGBSchema } from '../../../schemas/RGBSchema';

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
