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
                'https://pbs.twimg.com/profile_images/1790336717364379649/IYqT5QR8_400x400.jpg'
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
