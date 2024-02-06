import { Output } from '@bitspace/circuit';
import { cos } from '@thi.ng/shader-ast';
import { map } from 'rxjs';

import { PrimSchema } from '../../schemas'Prim/Prim';
import { InputPrimNode } from '../../internal/InputPrimNode/InputPrimNode';

export class Cosine extends InputPrimNode {
    static displayName = 'Cosine';

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema,
            observable: this.inputs.input.pipe(map(cos))
        })
    };
}
