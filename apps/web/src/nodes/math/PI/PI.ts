import { Node, Output } from '@bitspace/circuit';
import { Observable } from 'rxjs';

import { NumberSchema } from '../../../schemas/NumberSchema';

export class PI extends Node {
    static displayName = 'PI';

    inputs = {};

    outputs = {
        PI: new Output({
            name: 'Output',
            type: NumberSchema,
            observable: new Observable(sub => {
                sub.next(Math.PI);
            })
        })
    };
}
