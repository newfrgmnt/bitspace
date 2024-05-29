import { Node, Input, Output } from '@bitspace/circuit';
import {
    map,
    from,
    switchMap,
    skip,
    debounceTime,
    Observable,
    filter
} from 'rxjs';
import { NodeType } from '../../types';
import { ImageSchema, StringSchema } from '@bitspace/schemas';

export class SynthesizedImage extends Node {
    static displayName = 'Synthesized Image';
    static type = NodeType.SYNTHESIZED_IMAGE;

    inputs = {
        prompt: new Input({
            name: 'Prompt',
            type: StringSchema(),
            defaultValue: ''
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: ImageSchema(),
            observable: this.inputs.prompt.pipe(
                debounceTime(500),
                skip(1),
                map(prompt => prompt.trim()),
                filter(prompt => prompt.length > 0),
                switchMap(this.fetchImage.bind(this))
            )
        })
    };

    public fetchImage(prompt: string): Observable<string> {
        this.outputs.output.setLoading();

        return from(
            fetch('/api/ai/images', {
                method: 'POST',
                body: JSON.stringify({ prompt }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json() as Promise<{ url: string }[]>)
                .then(([v]) => v?.url ?? '')
                .finally(
                    this.outputs.output.resetLoading.bind(this.outputs.output)
                )
        );
    }
}
