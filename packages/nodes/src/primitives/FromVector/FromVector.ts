import { Node, Input, Output } from '@bitspace/circuit';

import { NodeType } from '../../types';
import { NumberSchema, VectorSchema } from '@bitspace/schemas';
import { map } from 'rxjs';

export class FromVector extends Node {
    static displayName = 'From Vector';
    static type = NodeType.FROM_VECTOR;

    inputs = {
        vector: new Input({
            name: 'Vector',
            type: VectorSchema(),
            defaultValue: { x: 0, y: 0, z: 0, w: 0 }
        })
    };

    outputs = {
        x: new Output({
            name: 'X',
            type: NumberSchema(),
            observable: this.inputs.vector.pipe(map(v => v.x))
        }),
        y: new Output({
            name: 'Y',
            type: NumberSchema(),
            observable: this.inputs.vector.pipe(map(v => v.y))
        }),
        z: new Output({
            name: 'Z',
            type: NumberSchema(),
            observable: this.inputs.vector.pipe(map(v => ('z' in v ? v.z : 0)))
        }),
        w: new Output({
            name: 'W',
            type: NumberSchema(),
            observable: this.inputs.vector.pipe(map(v => ('w' in v ? v.w : 0)))
        })
    };
}
