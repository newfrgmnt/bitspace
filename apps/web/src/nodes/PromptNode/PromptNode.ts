import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { from, switchMap, skip, tap } from 'rxjs';

/** Declare a zod schema for value validation */
const StringSchema = schema(z.string());

export class PromptNode extends Node {
    name = 'Prompt';

    inputs = {
        prompt: new Input({
            name: 'Prompt',
            type: StringSchema,
            defaultValue: ''
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: StringSchema,
            observable: this.inputs.prompt.pipe(
                skip(1),
                switchMap(prompt =>
                    from(
                        fetch('/api/prompt', {
                            method: 'POST',
                            body: JSON.stringify({ prompt }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => res.json())
                    )
                )
            )
        })
    };
}
