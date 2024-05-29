import { Node, Input } from '@bitspace/circuit';
import { NodeType } from '../../types';
import { AnySchema } from '@bitspace/schemas';

export class Console extends Node {
    static displayName = 'Console';
    static type = NodeType.CONSOLE;

    inputs = {
        input: new Input({
            name: 'Input',
            type: AnySchema(),
            defaultValue: undefined
        })
    };

    outputs = {};
}
