import { Node, Output } from '@bitspace/circuit';
import { Observable } from 'rxjs';

import { NumberSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';

export class Euler extends Node {
    static displayName = 'Euler';
    static type = NodeType.EULER;

    inputs = {};

    outputs = {
        Euler: new Output({
            name: 'Output',
            type: NumberSchema(),
            observable: new Observable(sub => {
                sub.next(Math.E);
            })
        })
    };
}
