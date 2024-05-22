import { Input, Node, Output } from '@bitspace/circuit';
import { clamp, float, Prim, Term } from '@thi.ng/shader-ast';
import { combineLatest, map } from 'rxjs';

import { PrimSchema } from '../../../schemas/Prim/Prim';

export class Clamp extends Node {
    static displayName = 'Clamp';

    inputs = {
        input: new Input<Term<Prim>>({
            name: 'Input',
            type: PrimSchema(),
            defaultValue: float(0)
        }),
        min: new Input<Term<Prim>>({
            name: 'Input',
            type: PrimSchema(),
            defaultValue: float(0)
        }),
        max: new Input<Term<Prim>>({
            name: 'Input',
            type: PrimSchema(),
            defaultValue: float(1)
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema(),
            observable: combineLatest([this.inputs.input, this.inputs.min, this.inputs.max]).pipe(
                map(inputs => clamp(...inputs))
            )
        })
    };
}
