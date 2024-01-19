import { Output } from '@nodl/core';
import { mod } from '@thi.ng/shader-ast';
import { combineLatest, map } from 'rxjs';

import { PrimSchema } from '../../../schemas/Prim/Prim';
import { ABPrimNode } from '../../internal/ABPrimNode/ABPrimNode';

export class Modulo extends ABPrimNode {
    name = 'Modulo';

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema,
            observable: combineLatest([this.inputs.a, this.inputs.b]).pipe(map(inputs => mod(...inputs)))
        })
    };
}
