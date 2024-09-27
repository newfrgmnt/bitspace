import { Node, Input, Output } from '@bitspace/circuit';

import { NodeType } from '../../types';
import { ImageSchema, URLSchema } from '@bitspace/schemas';

export class Image extends Node {
    static displayName = 'Image';
    static type = NodeType.IMAGE;

    inputs = {
        source: new Input({
            name: 'Source',
            type: URLSchema().optional(),
            defaultValue: null
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: ImageSchema().optional(),
            observable: this.inputs.source
        })
    };
}
