import { NodeType } from '../types';
import { CubicBezier } from './CubicBezier/CubicBezier';

export const EasingNodes = [CubicBezier].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type EasingNode = CubicBezier;

export interface EasingNodeConstructor {
    new (): EasingNode;
    type: NodeType;
}

export { CubicBezier };
