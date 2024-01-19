import { Input, Node, Output } from '@nodl/core';
import { abs, add, ceil, clamp, float, output, Prim, Term } from '@thi.ng/shader-ast';
import { combineLatest, lastValueFrom, map } from 'rxjs';

import { PrimSchema } from '../../../schemas/Prim/Prim';
import { ABPrimNode } from '../../internal/ABPrimNode/ABPrimNode';
import { InputPrimNode } from '../../internal/InputPrimNode/InputPrimNode';

export class Clamp extends Node {
    name = 'Clamp';

    inputs = {
        input: new Input<Term<Prim>>({
            name: 'Input',
            type: PrimSchema,
            defaultValue: float(0)
        }),
        min: new Input<Term<Prim>>({
            name: 'Input',
            type: PrimSchema,
            defaultValue: float(0)
        }),
        max: new Input<Term<Prim>>({
            name: 'Input',
            type: PrimSchema,
            defaultValue: float(1)
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema,
            observable: combineLatest([this.inputs.input, this.inputs.min, this.inputs.max]).pipe(map(inputs => clamp(...inputs)))
        })
    }
}
