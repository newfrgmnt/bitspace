import { Node, Output } from '@bitspace/circuit';
import { Observable } from 'rxjs';

import { NumberSchema } from '../../../schemas';
import { NodeType } from '@prisma/client';

export class PI extends Node {
    static displayName = 'PI';
    static type = NodeType.PI;

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
