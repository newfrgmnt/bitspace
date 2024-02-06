import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { map, from, switchMap, skip } from 'rxjs';
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
            observable: this.inputs.prompt.pipe(
                skip(1),
                switchMap(prompt =>
                    from(
                        fetch('/api/images', {
                            method: 'POST',
                            body: JSON.stringify({ prompt }),
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
