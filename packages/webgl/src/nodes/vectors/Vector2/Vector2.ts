import { Input, Node, Output } from '@bitspace/circuit';
import { float, vec2 } from '@thi.ng/shader-ast';
import { combineLatest, map } from 'rxjs';

import { FloatSchema } from '../../../schemas/Float/Float';
import { Vec2Schema } from '../../../schemas/Vec2/Vec2';

export class Vector2 extends Node {
    name = 'Vector 2';

    inputs = {
        x: new Input({
            name: 'X',
            type: FloatSchema,
            defaultValue: float(0)
        }),
        y: new Input({
            name: 'Y',
            type: FloatSchema,
            defaultValue: float(0)
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: Vec2Schema,
            observable: combineLatest([this.inputs.x, this.inputs.y]).pipe(map(inputs => vec2(...inputs)))
        })
    };
}
