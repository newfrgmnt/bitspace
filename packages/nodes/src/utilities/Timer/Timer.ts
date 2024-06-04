import { Node, Output } from '@bitspace/circuit';
import { interval, map, takeUntil, tap } from 'rxjs';
import { NodeType } from '../../types';
import { NumberSchema } from '@bitspace/schemas';

export class Timer extends Node {
    static displayName = 'Timer';
    static type = NodeType.TIMER;

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
