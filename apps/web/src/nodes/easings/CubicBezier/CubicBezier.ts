import { Node, Output } from '@bitspace/circuit';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { cubicBezier } from 'framer-motion';
import { EasingSchema } from '../../../schemas/EasingSchema';

export class CubicBezier extends Node {
    static displayName = 'Cubic Bezier';
    public curve: Observable<[number, number, number, number]> = new BehaviorSubject([0.65, 0, 0.35, 1]);

    inputs = {};

    outputs = {
        easing: new Output({
            name: 'Easing',
            type: EasingSchema,
            observable: this.curve.pipe(map(curve => cubicBezier.apply(this, curve)))
        })
    };
}
