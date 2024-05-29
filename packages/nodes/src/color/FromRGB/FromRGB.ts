import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';
import { NumberSchema } from '@bitspace/schemas';
import { RGBSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class FromRGB extends Node {
    static displayName = 'From RGB';
    static type = NodeType.FROM_RGB;

    inputs = {
        color: new Input({
            name: 'Color',
            type: RGBSchema(),
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
            type: NumberSchema(0, 1),
            observable: this.inputs.color.pipe(map(color => color.red))
        }),
        green: new Output({
            name: 'Green',
            type: NumberSchema(0, 1),
            observable: this.inputs.color.pipe(map(color => color.green))
        }),
        blue: new Output({
            name: 'Blue',
            type: NumberSchema(0, 1),
            observable: this.inputs.color.pipe(map(color => color.blue))
        })
    };
}
