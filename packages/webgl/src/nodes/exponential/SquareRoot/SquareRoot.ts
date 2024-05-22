import { Output } from '@bitspace/circuit';
import { sqrt } from '@thi.ng/shader-ast';
import { map } from 'rxjs';

import { PrimSchema } from '../../../schemas/Prim/Prim';
import { InputPrimNode } from '../../internal/InputPrimNode/InputPrimNode';

export class SquareRoot extends InputPrimNode {
    static displayName = 'SquareRoot';

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema(),
            observable: this.inputs.input.pipe(map(sqrt))
        })
    };
}
