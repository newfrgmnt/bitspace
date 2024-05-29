import { Node, Input, Output } from '@bitspace/circuit';
import { from, switchMap, skip, tap, debounceTime, combineLatest } from 'rxjs';
import { NodeType } from '../../types';
import { AnySchema, StringSchema } from '@bitspace/schemas';

export class Prompt extends Node {
    static displayName = 'Prompt';
    static type = NodeType.PROMPT_AI;

    inputs = {
        prompt: new Input({
            name: 'Prompt',
            type: StringSchema(),
            defaultValue: ''
        }),
        context: new Input({
            name: 'Context',
            type: AnySchema(),
            defaultValue: undefined
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: StringSchema(),
            observable: combineLatest([
                this.inputs.prompt,
                this.inputs.context
            ]).pipe(
                debounceTime(500),
                skip(1),
                switchMap(([prompt, context]) =>
                    from(
                        fetch('/api/ai/prompt', {
                            method: 'POST',
                            body: JSON.stringify({ prompt, context }),
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
