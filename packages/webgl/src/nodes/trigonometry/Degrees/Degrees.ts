import { Output } from '@bitspace/circuit';
import { degrees } from '@thi.ng/shader-ast';
import { map } from 'rxjs';

import { PrimSchema } from '../../schemas'Prim/Prim';
import { InputPrimNode } from '../../internal/InputPrimNode/InputPrimNode';

export class Degrees extends InputPrimNode {
    static displayName = 'Degrees';

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema,
            observable: this.inputs.input.pipe(map(degrees))
        })
    };
}
