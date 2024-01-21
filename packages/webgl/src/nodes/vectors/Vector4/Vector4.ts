import { Input, Node, Output } from '@bitspace/circuit';
import { float, Prim, Term, Vec, vec3, vec4 } from '@thi.ng/shader-ast';
import { combineLatest, map } from 'rxjs';

import { FloatSchema } from '../../../schemas/Float/Float';
import { Vec4Schema } from '../../../schemas/Vec4/Vec4';

export class Vector4 extends Node {
    static displayName = 'Vector 4';

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
        }),
        z: new Input({
            name: 'Z',
            type: FloatSchema,
            defaultValue: float(0)
        }),
        w: new Input({
            name: 'W',
            type: FloatSchema,
            defaultValue: float(1)
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: Vec4Schema,
            observable: combineLatest([this.inputs.x, this.inputs.y, this.inputs.z, this.inputs.w]).pipe(
                map(inputs => vec4(...inputs))
            )
        })
    };
}
