import { Output } from '@bitspace/circuit';
import { acos } from '@thi.ng/shader-ast';
import { map } from 'rxjs';

import { PrimSchema } from '../../schemas'Prim/Prim';
import { InputPrimNode } from '../../internal/InputPrimNode/InputPrimNode';

export class Arccosine extends InputPrimNode {
    static displayName = 'Arccosine';

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema,
            observable: this.inputs.input.pipe(map(acos))
        })
    };
}
