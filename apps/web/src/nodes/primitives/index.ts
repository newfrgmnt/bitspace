import { NodeType } from '@prisma/client';
import { Image } from './Image/Image';
import { Webcam } from './Webcam/Webcam';

export const PrimitiveNodes = [Image, Webcam].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type PrimitiveNode = Image | Webcam;

export interface PrimitiveNodeConstructor {
    new (): PrimitiveNode;
    type: NodeType;
}
