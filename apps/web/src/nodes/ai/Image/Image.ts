import { Node, Input, Output } from '@bitspace/circuit';
import { map, from, switchMap, skip, combineLatest, debounceTime } from 'rxjs';
import { NodeType } from '@prisma/client';
import { AnySchema, ImageSchema, StringSchema } from '../../schemas';

export class Image extends Node {
    static displayName = 'Image';
    static type = NodeType.IMAGE_AI;

    inputs = {
        prompt: new Input({
            name: 'Prompt',
            type: StringSchema,
            defaultValue: 'A man looking outside of a window from a house on a winter landscape'
        }),
        context: new Input({
            name: 'Context',
            type: AnySchema,
            defaultValue: undefined
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: ImageSchema,
            observable: combineLatest([this.inputs.prompt, this.inputs.context]).pipe(
                debounceTime(500),
                skip(1),
                switchMap(([prompt, context]) =>
                    from(
                        fetch('/api/ai/images', {
                            method: 'POST',
                            body: JSON.stringify({ prompt, context: context }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => res.json())
                    )
                ),
                map(data => data[0].url)
            )
        })
    };
}
