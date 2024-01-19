import { Input, Node, Output } from '@nodl/core';
import { float, step } from '@thi.ng/shader-ast';
import { combineLatest, map } from 'rxjs';

import { PrimSchema } from '../../../schemas/Prim/Prim';

export class Step extends Node {
    name = 'Step';

    inputs = {
        edge: new Input({
            name: 'Edge',
            type: PrimSchema,
            defaultValue: float(0)
        }),
        input: new Input({
            name: 'Input',
            type: PrimSchema,
            defaultValue: float(0)
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema,
            observable: combineLatest([this.inputs.edge, this.inputs.input]).pipe(map(inputs => step(...inputs)))
        })
    };
}
