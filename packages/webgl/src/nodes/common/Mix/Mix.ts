import { Input, Node, Output } from '@nodl/core';
import { float, mix, Prim, Term } from '@thi.ng/shader-ast';
import { combineLatest, map } from 'rxjs';
import { FloatSchema } from '../../../schemas/Float/Float';

import { PrimSchema } from '../../../schemas/Prim/Prim';

export class Mix extends Node {
    name = 'Mix';

    inputs = {
        a: new Input<Term<Prim>>({
            name: 'A',
            type: PrimSchema,
            defaultValue: float(0)
        }),
        b: new Input<Term<Prim>>({
            name: 'B',
            type: PrimSchema,
            defaultValue: float(1)
        }),
        t: new Input<Term<'float'>>({
            name: 'T',
            type: FloatSchema,
            defaultValue: float(0)
        })
    }

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema,
            observable: combineLatest([this.inputs.a, this.inputs.b, this.inputs.t]).pipe(map(inputs => mix(...inputs)))
        })
    };
}
