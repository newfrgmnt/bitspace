import { Prompt } from './Prompt/Prompt';
import { SynthesizedImage } from './SynthesizedImage/SynthesizedImage';
import { NodeType } from '../types';
import { ImageEdit } from './ImageEdit/ImageEdit';
import { Vision } from './Vision/Vision';

// AI
export const AINodes = [SynthesizedImage, ImageEdit, Prompt, Vision].sort(
    (a, b) => a.displayName.localeCompare(b.displayName)
);

export type AINode = SynthesizedImage | ImageEdit | Prompt | Vision;

export interface AINodeConstructor {
    new (): AINode;
    type: NodeType;
}

export { SynthesizedImage, ImageEdit, Prompt, Vision };
