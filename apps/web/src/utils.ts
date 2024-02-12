import { Position } from './circuit';

export const lerp = (a: number, b: number, t: number) => {
    return a * (1 - t) + b * t;
};

export const distanceBetween = (a: Position, b: Position) => {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};
export const angleBetween = (a: Position, b: Position) => {
    return Math.atan2(b.x - a.x, b.y - a.y);
};
