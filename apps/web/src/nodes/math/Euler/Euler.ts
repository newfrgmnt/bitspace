import { Node, Output } from '@bitspace/circuit';
import { Observable } from 'rxjs';

import { NumberSchema } from '../../schemas';
import { NodeType } from '@prisma/client';

export class Euler extends Node {
    static displayName = 'Euler';
    static type = NodeType.EULER;

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
