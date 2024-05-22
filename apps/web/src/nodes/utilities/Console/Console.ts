import { z } from 'zod';
import { Node, Input, schema } from '@bitspace/circuit';
import { NodeType } from '@prisma/client';
import { AnySchema } from '@/nodes/schemas';

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
