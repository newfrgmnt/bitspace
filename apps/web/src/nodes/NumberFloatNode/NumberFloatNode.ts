import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { map } from 'rxjs';
import { FloatSchema, float } from '@bitspace/webgl';

const NumberSchema = schema('Number', z.number());

export class NumberFloat extends Node {
    name = 'Number - Float';

    inputs = {
        input: new Input({
            name: 'Input',
            type: NumberSchema,
            defaultValue: 0
        })
    };

    outputs = {
        rgb: new Output({
            name: 'RGB',
            type: FloatSchema,
            observable: this.inputs.input.pipe(map(float))
        })
    };
}
