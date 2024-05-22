import { Output } from '@bitspace/circuit';
import { radians } from '@thi.ng/shader-ast';
import { map } from 'rxjs';

import { PrimSchema } from '../../../schemas/Prim/Prim';
import { InputPrimNode } from '../../internal/InputPrimNode/InputPrimNode';

export class Radians extends InputPrimNode {
    static displayName = 'Radians';

    outputs = {
        output: new Output({
            name: 'Output',
            type: PrimSchema(),
            observable: this.inputs.input.pipe(map(radians))
        })
    };
}
