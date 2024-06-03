import { NodeType } from '../types';
import { FromVector } from './FromVector/FromVector';
import { Image } from './Image/Image';

export const PrimitiveNodes = [Image, FromVector].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type PrimitiveNode = Image | FromVector;

export interface PrimitiveNodeConstructor {
    new (): PrimitiveNode;
    type: NodeType;
}

export { Image, FromVector };
