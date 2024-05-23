import { Prompt } from './Prompt/Prompt';
import { SynthesizedImage } from './SynthesizedImage/SynthesizedImage';
import { NodeType } from '@prisma/client';
import { ImageEdit } from './ImageEdit/ImageEdit';

// AI
export const AINodes = [SynthesizedImage, ImageEdit, Prompt].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type AINode = SynthesizedImage | ImageEdit | Prompt;

export interface AINodeConstructor {
    new (): AINode;
    type: NodeType;
}
