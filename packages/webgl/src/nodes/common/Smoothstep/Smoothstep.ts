import { Input, Node, Output } from '@nodl/core';
import { float, smoothstep, step } from '@thi.ng/shader-ast';
import { combineLatest, map } from 'rxjs';

import { PrimSchema } from '../../../schemas/Prim/Prim';

export class Smoothstep extends Node {
    name = 'Smoothstep';

    inputs = {
        edgeA: new Input({
            name: 'Edge A',
            type: PrimSchema,
            defaultValue: float(0)
        }),
        edgeB: new Input({
            name: 'Edge B',
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
            observable: combineLatest([this.inputs.edgeA, this.inputs.edgeB, this.inputs.input]).pipe(map(inputs => smoothstep(...inputs)))
        })
    };
}
