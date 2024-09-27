import { Node, Input, Output } from '@bitspace/circuit';
import { Observable } from 'rxjs';
import { NodeType } from '../../types';
import { ImageSchema, StringSchema } from '@bitspace/schemas';

export class ImageEdit extends Node {
    static displayName = 'Image Edit';
    static type = NodeType.IMAGE_EDIT_AI;

    inputs = {
        prompt: new Input({
            name: 'Prompt',
            type: StringSchema(),
            defaultValue:
                'A man looking outside of a window from a house on a winter landscape'
        }),
        image: new Input({
            name: 'Context',
            type: ImageSchema().optional(),
            defaultValue: null
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: ImageSchema().optional(),
            observable: new Observable()
        })
    };
}
