import { z } from 'zod';
import { Node, Output, schema } from '@bitspace/circuit';
import { interval, map } from 'rxjs';
import { NodeType } from '@prisma/client';

const NumberSchema = schema('Number', z.number());

export class Timer extends Node {
    static displayName = 'Timer';
    static type = NodeType.TIMER;

    public startTime = Date.now();

    inputs = {};

    outputs = {
        milliseconds: new Output({
            name: 'Milliseconds',
            type: NumberSchema,
            observable: interval(1000 / 60).pipe(map(() => Date.now() - this.startTime))
        }),
        seconds: new Output({
            name: 'Seconds',
            type: NumberSchema,
            observable: interval(1000 / 60).pipe(map(() => (Date.now() - this.startTime) / 1000))
        })
    };
}
