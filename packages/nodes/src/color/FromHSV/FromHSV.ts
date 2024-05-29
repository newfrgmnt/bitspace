import { z } from 'zod';
import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';
import { HSVSchema, NumberSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class FromHSV extends Node {
    static displayName = 'From HSV';
    static type = NodeType.FROM_HSV;

    inputs = {
        color: new Input({
            name: 'Color',
            type: HSVSchema(),
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
            type: NumberSchema(0, 1),
            observable: this.inputs.color.pipe(map(color => color.value))
        })
    };
}
