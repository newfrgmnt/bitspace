import { Input, Node, Output } from '@bitspace/circuit';
import { NumberSchema, EasingSchema, minMaxNumber } from '@bitspace/schemas';
import { combineLatest, map } from 'rxjs';
import { NodeType } from '../../types';
import { cubicBezier } from 'framer-motion';

export class Lerp extends Node {
    static displayName = 'Lerp';
    static type = NodeType.LERP;

    inputs = {
        a: new Input({
            name: 'A',
            type: NumberSchema(),
            defaultValue: 0
        }),
        b: new Input({
            name: 'B',
            type: NumberSchema(),
            defaultValue: 1
        }),
        t: new Input({
            name: 'T',
            type: NumberSchema(0, 1),
            defaultValue: 0.5
        }),
        easing: new Input({
            name: 'Easing',
            type: EasingSchema(),
            defaultValue: [0, 0, 1, 1] as const
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: NumberSchema(),
            observable: combineLatest([
                this.inputs.a,
                this.inputs.b,
                this.inputs.t,
                this.inputs.easing
            ]).pipe(
                map(([a, b, t, easing]) =>
                    this.lerp(a, b, cubicBezier(...easing)(t))
                )
            )
        })
    };

    /** Linear Interpolation */
    public lerp(a: number, b: number, t: number) {
        return a * (1 - t) + b * t;
    }
}
