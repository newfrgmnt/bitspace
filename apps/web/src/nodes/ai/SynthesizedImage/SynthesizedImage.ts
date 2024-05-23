import { Node, Input, Output } from '@bitspace/circuit';
import {
    map,
    from,
    switchMap,
    skip,
    combineLatest,
    debounceTime,
    Observable
} from 'rxjs';
import { NodeType } from '@prisma/client';
import { AnySchema, ImageSchema, StringSchema } from '../../schemas';

export class SynthesizedImage extends Node {
    static displayName = 'Synthesized Image';
    static type = NodeType.SYNTHESIZED_IMAGE;

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
            type: ImageSchema(),
            observable: combineLatest([
                this.inputs.prompt,
                this.inputs.context
            ]).pipe(
                debounceTime(500),
                skip(1),
                switchMap(this.fetchImage.bind(this)),
                map(data => data[0].url)
            )
        })
    };

    public fetchImage([prompt, context]: [string, any]): Observable<any> {
        this.outputs.output.setLoading();

        return from(
            fetch('/api/ai/images', {
                method: 'POST',
                body: JSON.stringify({ prompt, context: context }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .finally(
                    this.outputs.output.resetLoading.bind(this.outputs.output)
                )
        );
    }
}
