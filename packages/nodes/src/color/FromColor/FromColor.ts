import { z } from 'zod';
import { Node, Input, Output } from '@bitspace/circuit';
import { combineLatest, map } from 'rxjs';
import { ColorSchema, NumberSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';
import { hsv, rgb } from 'color-convert';

export class FromColor extends Node {
    static displayName = 'From Color';
    static type = NodeType.FROM_COLOR;

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
        color: new Output({
            name: 'Color',
            type: ColorSchema(),
            observable: this.inputs.color
        }),
        hue: new Output({
            name: 'Hue',
            type: NumberSchema(0, 360, true),
            observable: this.inputs.color.pipe(map(color => color.hue))
        }),
        saturation: new Output({
            name: 'Saturation',
            type: NumberSchema(0, 1),
            observable: this.inputs.color.pipe(map(color => color.saturation))
        }),
        value: new Output({
            name: 'Value',
            type: NumberSchema(),
            observable: this.inputs.color.pipe(map(color => color.value))
        }),
        red: new Output({
            name: 'Red',
            type: NumberSchema(0, 1),
            observable: this.inputs.color.pipe(
                map(this.computeRGBComponent('r'))
            )
        }),
        green: new Output({
            name: 'Green',
            type: NumberSchema(0, 1),
            observable: this.inputs.color.pipe(
                map(this.computeRGBComponent('g'))
            )
        }),
        blue: new Output({
            name: 'Blue',
            type: NumberSchema(0, 1),
            observable: this.inputs.color.pipe(
                map(this.computeRGBComponent('b'))
            )
        })
    };

    public computeRGBComponent(component: 'r' | 'g' | 'b') {
        return (color: z.infer<ReturnType<typeof ColorSchema>>) => {
            const [r, g, b] = hsv.rgb([
                color.hue,
                color.saturation * 100,
                color.value * 100
            ]);

            switch (component) {
                case 'r':
                    return r / 255;
                case 'g':
                    return g / 255;
                case 'b':
                    return b / 255;
            }
        };
    }
}
