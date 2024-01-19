import { Input, Node, Output } from '@nodl/core';
import { float, vec3 } from '@thi.ng/shader-ast';
import { combineLatest, map } from 'rxjs';

import { FloatSchema } from '../../../schemas/Float/Float';
import { Vec3Schema } from '../../../schemas/Vec3/Vec3';

export class Vector3 extends Node {
    name = 'Vector 3';

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
        })
    }

    outputs = {
        output: new Output({
            name: 'Output',
            type: Vec3Schema,
            observable: combineLatest([this.inputs.x, this.inputs.y, this.inputs.z]).pipe(map(inputs => vec3(...inputs)))
        })
    };
}
