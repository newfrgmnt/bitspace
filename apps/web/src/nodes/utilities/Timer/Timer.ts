import { z } from 'zod';
import { Node, Output, schema } from '@bitspace/circuit';
import { interval, tap } from 'rxjs';

const NumberSchema = schema('Number', z.number());

export class Timer extends Node {
    static displayName = 'Timer';

    inputs = {};

    outputs = {
        time: new Output({
            name: 'Time',
            type: NumberSchema,
            observable: interval(30)
        })
    };
}
