import { CubicBezier } from './CubicBezier/CubicBezier';

export const EasingNodes = [CubicBezier].sort((a, b) => a.displayName.localeCompare(b.displayName));
