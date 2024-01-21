import { z } from 'zod';
import { Node, Input, Output, schema } from '@bitspace/circuit';
import { map, from, switchMap, skip } from 'rxjs';

/** Declare a zod schema for value validation */
const StringSchema = schema(z.string());

const ImageSchema = schema('Image', z.string().url());

export class Image extends Node {
    static displayName = 'Image';

    inputs = {
        prompt: new Input({
            name: 'Prompt',
            type: StringSchema,
            defaultValue: 'A man looking outside of a window from a house on a winter landscape'
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
