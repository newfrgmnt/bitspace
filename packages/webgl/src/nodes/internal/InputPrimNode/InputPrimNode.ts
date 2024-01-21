import { Input, Node, Output } from '@bitspace/circuit';
import { float, Prim, Term } from '@thi.ng/shader-ast';

import { PrimSchema } from '../../../schemas/Prim/Prim';

export abstract class InputPrimNode extends Node {
    static displayName = 'Input Prim Node';

    inputs = {
        input: new Input<Term<Prim>>({
            name: 'Input',
            type: PrimSchema,
            defaultValue: float(0)
        })
    };

    outputs = {};
}
