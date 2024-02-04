import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { map } from 'rxjs';
import { HSVSchema } from '../../../schemas/HSVSchema';
import { NodeType } from '@prisma/client';

const NumberSchema = schema('Number', z.number());

export class FromHSV extends Node {
    static displayName = 'From HSV';
    static type = NodeType.FROM_HSV;

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
