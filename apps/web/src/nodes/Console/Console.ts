import { z } from 'zod';
import { Node, Input, schema } from '@bitspace/circuit';

import { console } from '../../circuit/console';

/** Declare a zod schema for value validation */
const AnySchema = schema('Any', z.any());

export class Console extends Node {
    static displayName = 'Console';

    inputs = {
        input: new Input({
            name: 'Input',
            type: AnySchema,
            defaultValue: undefined
        })
    };

    outputs = {};

    constructor() {
        super();
        this.inputs.input.subscribe(value => console.next(value));
    }

    public dispose(): void {
        super.dispose();
    }
}
