import { Node, Output } from '@bitspace/circuit';
import { Observable } from 'rxjs';

import { NumberSchema } from '../../../schemas/NumberSchema';

export class Euler extends Node {
    static displayName = 'Euler';

    inputs = {};

    outputs = {
        Euler: new Output({
            name: 'Output',
            type: NumberSchema,
            observable: new Observable(sub => {
                sub.next(Math.E);
            })
        })
    };
}
