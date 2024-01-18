import { z } from 'zod';
import { Node, Input, Output, schema } from '@nodl/core';
import { map, from, switchMap } from 'rxjs';

/** Declare a zod schema for value validation */
const StringSchema = schema(z.string());

const ImageSchema = schema(z.string().url());

export class ImageNode extends Node {
    name = 'Image';

    inputs = {
        prompt: new Input({
            name: 'A',
            type: StringSchema,
            defaultValue: 'A man looking outside of a window from a house on a winter landscape'
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: ImageSchema,
            observable: this.inputs.prompt.pipe(
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
