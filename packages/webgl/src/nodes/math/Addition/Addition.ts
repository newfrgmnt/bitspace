import { Output } from '@bitspace/circuit';
import { add } from '@thi.ng/shader-ast';
import { combineLatest, map } from 'rxjs';

import { PrimSchema } from '../../../schemas/Prim/Prim';
import { ABPrimNode } from '../../internal/ABPrimNode/ABPrimNode';

export class Addition extends ABPrimNode {
    static displayName = 'Addition';

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema(),
            observable: combineLatest([this.inputs.a, this.inputs.b]).pipe(map(inputs => add(...inputs)))
        })
    };
}
