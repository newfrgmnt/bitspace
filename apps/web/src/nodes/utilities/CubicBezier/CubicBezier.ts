import { Input, Node, Output } from '@bitspace/circuit';
import { combineLatest, map } from 'rxjs';
import { NumberSchema } from '../../../schemas/NumberSchema';
import { cubicBezier } from 'framer-motion';

export class CubicBezier extends Node {
    static displayName = 'Cubic Bezier';

    inputs = {
        t: new Input({
            name: 'T',
            type: NumberSchema,
            defaultValue: 0
        }),
        x1: new Input({
            name: 'X1',
            type: NumberSchema,
            defaultValue: 0
        }),
        y1: new Input({
            name: 'Y1',
            type: NumberSchema,
            defaultValue: 0
        }),
        x2: new Input({
            name: 'X2',
            type: NumberSchema,
            defaultValue: 0
        }),
        y2: new Input({
            name: 'Y2',
            type: NumberSchema,
            defaultValue: 0
        })
    };

    outputs = {
        p0: new Output({
            name: 'Output',
            type: NumberSchema,
            observable: combineLatest([
                this.inputs.t,
                this.inputs.x1,
                this.inputs.y1,
                this.inputs.x2,
                this.inputs.y2
            ]).pipe(map(([t, x1, y1, x2, y2]) => cubicBezier(x1, y1, x2, y2)(t)))
        })
    };
}
