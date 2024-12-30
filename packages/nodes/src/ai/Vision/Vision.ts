import { Node, Input, Output } from '@bitspace/circuit';
import {
    from,
    switchMap,
    skip,
    debounceTime,
    filter,
    tap,
    finalize
} from 'rxjs';
import { NodeType } from '../../types';
import { ImageSchema, StringSchema } from '@bitspace/schemas';

export class Vision extends Node {
    static displayName = 'Vision';
    static type = NodeType.VISION;

    inputs = {
        image: new Input({
            name: 'Image',
            type: ImageSchema(),
            defaultValue: ''
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: StringSchema(),
            observable: this.inputs.image.pipe(
                debounceTime(500),
                skip(1),
                filter(image => image.length > 0),
                tap(this.setLoading.bind(this)),
                switchMap(imageUrl =>
                    from(
                        fetch('/api/ai/vision', {
                            method: 'POST',
                            body: JSON.stringify({ imageUrl }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => res.json())
                    )
                ),
                finalize(this.resetLoading.bind(this))
            )
        })
    };

    public setLoading() {
        this.outputs.output.setLoading();
    }

    public resetLoading() {
        this.outputs.output.resetLoading();
    }
}
