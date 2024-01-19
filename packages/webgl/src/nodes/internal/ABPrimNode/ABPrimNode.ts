import { Input, Node } from '@nodl/core';
import { float, Prim, Term } from '@thi.ng/shader-ast';

import { PrimSchema } from '../../../schemas/Prim/Prim';

export abstract class ABPrimNode extends Node {
    name = 'AB Prim Node';

    inputs = {
        a: new Input<Term<Prim>>({
            name: 'A',
            type: PrimSchema,
            defaultValue: float(0)
        }),
        b: new Input<Term<Prim>>({
            name: 'B',
            type: PrimSchema,
            defaultValue: float(0)
        })
    };

    outputs = {};
}
