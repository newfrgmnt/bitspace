import { NodeType } from '../../types';
import { Input, Node, Output } from '@bitspace/circuit';
import { ColorSchema, GradientSchema, minMaxNumber } from '@bitspace/schemas';
import { combineLatest, map } from 'rxjs';

export class Gradient extends Node {
    static displayName = 'Gradient';
    static type = NodeType.GRADIENT;

    inputs = {
        a: new Input({
            name: 'A',
            type: ColorSchema(),
            defaultValue: {
                hue: 0,
                saturation: 0.5,
                value: 1
            }
        }),
        b: new Input({
            name: 'B',
            type: ColorSchema(),
            defaultValue: {
                hue: 180,
                saturation: 0.5,
                value: 1
            }
        }),
        angle: new Input({
            name: 'Angle',
            type: minMaxNumber(0, 360, true),
            defaultValue: 0
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: GradientSchema(),
            observable: combineLatest([
                this.inputs.a,
                this.inputs.b,
                this.inputs.angle
            ]).pipe(
                map(([a, b, angle]) => ({
                    type: 'linear',
                    colors: [
                        { color: a, position: 0 },
                        { color: b, position: 1 }
                    ],
                    angle
                }))
            )
        })
    };
}
