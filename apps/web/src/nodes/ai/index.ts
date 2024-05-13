import { Prompt } from './Prompt/Prompt';
import { Image } from './Image/Image';
import { NodeType } from '@prisma/client';
import { ImageEdit } from './ImageEdit/ImageEdit';

// AI
export const AINodes = [Image, ImageEdit, Prompt].sort((a, b) => a.displayName.localeCompare(b.displayName));

export type AINode = Image | ImageEdit | Prompt;

export interface AINodeConstructor {
    new (): AINode;
    type: NodeType;
}
