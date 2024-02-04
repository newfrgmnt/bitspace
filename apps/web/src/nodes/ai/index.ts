import { Prompt } from './Prompt/Prompt';
import { Image } from './Image/Image';
import { NodeType } from '@prisma/client';

// AI
export const AINodes = [Image, Prompt].sort((a, b) => a.displayName.localeCompare(b.displayName));

export type AINode = Image | Prompt;

export interface AINodeConstructor {
    new (): AINode;
    type: NodeType;
}
