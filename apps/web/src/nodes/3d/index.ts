import { NodeType } from '@prisma/client';

// AI
export const ThreeDNodes = [].sort((a, b) => a.displayName.localeCompare(b.displayName));

export type ThreeDNode = Image | Prompt;

export interface AINodeConstructor {
    new (): ThreeDNode;
    type: NodeType;
}
