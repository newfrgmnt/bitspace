import { Input, Node, Output } from '@bitspace/circuit';
import { NumberSchema } from '@bitspace/schemas';
import { combineLatest, map } from 'rxjs';
import { NodeType } from '../../types';

export class Oscillator extends Node {
    static displayName = 'Oscillator';
    static type = NodeType.OSCILLATOR;

    inputs = {
        frequency: new Input({
            name: 'Frequency',
            type: NumberSchema(),
            defaultValue: 1
        }),
        amplitude: new Input({
            name: 'Amplitude',
            type: NumberSchema(),
            defaultValue: 1
        }),
        time: new Input({
            name: 'Time',
            type: NumberSchema(),
            defaultValue: 0
        })
    };

    outputs = {
        output: new Output({
            name: 'Oscillation',
            type: NumberSchema(),
            observable: combineLatest([
                this.inputs.frequency,
                this.inputs.amplitude,
                this.inputs.time
            ]).pipe(
                map(
                    ([frequency, amplitude, time]) =>
                        (amplitude *
                            Math.sin(Math.PI * 2.0 * time * frequency) +
                            amplitude) /
                        2
                )
            )
        })
    };
}
