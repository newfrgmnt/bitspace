import { NodeType } from '@bitspace/supabase/prisma';
import { Mesh } from './Mesh/Mesh';

// AI
export const ThreeDNodes = [Mesh].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type ThreeDNode = Mesh;

export interface ThreeDNodeConstructor {
    new (): ThreeDNode;
    type: NodeType;
}
