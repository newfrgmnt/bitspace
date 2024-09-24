import { NodeType } from '../types';
import { FromVector } from './FromVector/FromVector';
import { Image } from './Image/Image';
import { Shader } from './Shader/Shader';

export const PrimitiveNodes = [Image, Shader, FromVector].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type PrimitiveNode = Image | Shader | FromVector;

export interface PrimitiveNodeConstructor {
    new (): PrimitiveNode;
    type: NodeType;
}

export { Image, Shader, FromVector };
