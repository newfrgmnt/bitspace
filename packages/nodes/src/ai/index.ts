import { Prompt } from './Prompt/Prompt';
import { SynthesizedImage } from './SynthesizedImage/SynthesizedImage';
import { NodeType } from '../types';
import { Vision } from './Vision/Vision';

// AI
export const AINodes = [SynthesizedImage, Prompt, Vision].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type AINode = SynthesizedImage | Prompt | Vision;

export interface AINodeConstructor {
    new (): AINode;
    type: NodeType;
}

export { SynthesizedImage, Prompt, Vision };
