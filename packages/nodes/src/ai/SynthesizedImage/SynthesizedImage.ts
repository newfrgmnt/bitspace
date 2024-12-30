import { Node, Input, Output } from '@bitspace/circuit';
import {
    map,
    from,
    switchMap,
    skip,
    debounceTime,
    Observable,
    filter,
    tap,
    finalize
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
                tap(this.setLoading.bind(this)),
                switchMap(this.fetchImage.bind(this)),
                finalize(this.resetLoading.bind(this))
            )
        })
    };

    public fetchImage(prompt: string): Observable<string> {
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

    public setLoading() {
        this.outputs.output.setLoading();
    }

    public resetLoading() {
        this.outputs.output.resetLoading();
    }
}
