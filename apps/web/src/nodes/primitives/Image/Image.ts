import { Node, Input, Output } from '@bitspace/circuit';

import { NodeType } from '@prisma/client';
import { ImageSchema, URLSchema } from '../../schemas';

export class Image extends Node {
    static displayName = 'Image';
    static type = NodeType.IMAGE;

    inputs = {
        source: new Input({
            name: 'Source',
            type: URLSchema(),
            defaultValue:
                'https://avatars.githubusercontent.com/u/137070789?s=200&v=4'
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: ImageSchema(),
            observable: this.inputs.source
        })
    };
}
