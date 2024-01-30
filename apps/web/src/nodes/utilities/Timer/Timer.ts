import { z } from 'zod';
import { Node, Output, schema } from '@bitspace/circuit';
import { interval, map } from 'rxjs';

const NumberSchema = schema('Number', z.number());

export class Timer extends Node {
    static displayName = 'Timer';

    public startTime = Date.now();

    inputs = {};

    outputs = {
        time: new Output({
            name: 'Time',
            type: NumberSchema,
            observable: interval(1000 / 60).pipe(map(() => Date.now() - this.startTime))
        })
    };
}
