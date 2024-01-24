import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { map } from 'rxjs';
import { NumberSchema } from '../../../schemas/NumberSchema';
import { RGBSchema } from '../../../schemas/RGBSchema';

export class RGB extends Node {
    static displayName = 'RGB';

    inputs = {
        color: new Input({
            name: 'Color',
            type: RGBSchema,
            defaultValue: {
                red: 0,
                green: 0,
                blue: 0
            }
        })
    };

    outputs = {
        red: new Output({
            name: 'Red',
            type: NumberSchema,
            observable: this.inputs.color.pipe(map(color => color.red))
        }),
        green: new Output({
            name: 'Green',
            type: NumberSchema,
            observable: this.inputs.color.pipe(map(color => color.green))
        }),
        blue: new Output({
            name: 'Blue',
            type: NumberSchema,
            observable: this.inputs.color.pipe(map(color => color.blue))
        })
    };
}
