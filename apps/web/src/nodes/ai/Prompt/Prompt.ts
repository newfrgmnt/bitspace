import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { from, switchMap, skip, tap } from 'rxjs';
import { NodeType } from '@prisma/client';
import { StringSchema } from '../../schemas';

export class Prompt extends Node {
    static displayName = 'Prompt';
    static type = NodeType.PROMPT_AI;

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
