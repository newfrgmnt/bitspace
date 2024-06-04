import { combineLatest, interval, map, takeUntil } from 'rxjs';
import { z } from 'zod';

import { Input } from '../Input/Input';
import { Output } from '../Output/Output';
import { Node } from './Node';

export const NumberSchema = () => z.number().describe('Number');

export class Addition extends Node {
    static displayName = 'Addition';

    inputs = {
        a: new Input({ name: 'A', type: NumberSchema(), defaultValue: 0 }),
        b: new Input({ name: 'B', type: NumberSchema(), defaultValue: 0 })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: NumberSchema(),
            observable: combineLatest([this.inputs.a, this.inputs.b]).pipe(
                map(inputs => inputs.reduce((sum, value) => sum + value), 0)
            )
        })
    };
}

export class Timer extends Node {
    static displayName = 'Timer';

    public startTime = Date.now();

    inputs = {};

    outputs = {
        milliseconds: new Output({
            name: 'Milliseconds',
            type: NumberSchema(),
            observable: interval(1000 / 60).pipe(
                takeUntil(this.disposeSignal$),
                map(() => Date.now() - this.startTime)
            )
        }),
        seconds: new Output({
            name: 'Seconds',
            type: NumberSchema(),
            observable: interval(1000 / 60).pipe(
                takeUntil(this.disposeSignal$),
                map(() => (Date.now() - this.startTime) / 1000)
            )
        })
    };
}
