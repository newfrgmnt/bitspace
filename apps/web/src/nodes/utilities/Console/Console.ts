import { z } from 'zod';
import { Node, Input, schema } from '@bitspace/circuit';
import { NodeType } from '@prisma/client';

/** Declare a zod schema for value validation */
const AnySchema = schema('Any', z.any());

export class Console extends Node {
    static displayName = 'Console';
    static type = NodeType.CONSOLE;

    inputs = {
        input: new Input({
            name: 'Input',
            type: AnySchema,
            defaultValue: undefined
        })
    };

    outputs = {};
}
