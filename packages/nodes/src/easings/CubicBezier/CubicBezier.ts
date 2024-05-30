import { Input, Node, Output } from '@bitspace/circuit';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { EasingSchema, minMaxNumber } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class CubicBezier extends Node {
    static displayName = 'Cubic Bezier';
    static type = NodeType.CUBIC_BEZIER;

    inputs = {
        x1: new Input<number>({
            name: 'X1',
            type: minMaxNumber(0, 1),
            defaultValue: 0.65
        }),
        y1: new Input<number>({
            name: 'Y1',
            type: minMaxNumber(0, 1),
            defaultValue: 0
        }),
        x2: new Input<number>({
            name: 'X2',
            type: minMaxNumber(0, 1),
            defaultValue: 0.35
        }),
        y2: new Input<number>({
            name: 'Y2',
            type: minMaxNumber(0, 1),
            defaultValue: 1
        })
    };

    outputs = {
        easing: new Output({
            name: 'Easing',
            type: EasingSchema(),
            observable: combineLatest([
                this.inputs.x1,
                this.inputs.y1,
                this.inputs.x2,
                this.inputs.y2
            ])
        })
    };
}
