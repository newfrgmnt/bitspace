import { Node, Input, Output } from '@bitspace/circuit';
import { from, switchMap, skip, debounceTime, filter } from 'rxjs';
import { NodeType } from '@prisma/client';
import { ImageSchema, StringSchema } from '@bitspace/schemas';

export class Vision extends Node {
    static displayName = 'Vision';
    static type = NodeType.VISION;

    inputs = {
        image: new Input({
            name: 'Image',
            type: ImageSchema(),
            defaultValue:
                'https://pbs.twimg.com/profile_images/1790336717364379649/IYqT5QR8_400x400.jpg'
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
                )
            )
        })
    };
}
