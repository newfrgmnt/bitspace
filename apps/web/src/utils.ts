import { z } from 'zod';
import { Position } from './circuit';
import { ColorSchema } from '@bitspace/schemas';
import { hex } from 'color-convert';

export const lerp = (a: number, b: number, t: number) => {
    return a * (1 - t) + b * t;
};

export const distanceBetween = (a: Position, b: Position) => {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};

export const angleBetween = (a: Position, b: Position) => {
    return Math.atan2(b.x - a.x, b.y - a.y);
};

export type ColorSchemaType = z.infer<ReturnType<typeof ColorSchema>>;

export const resolveColor = <T extends ColorSchemaType>(raw: string): T => {
    const [hue, saturation, value] = hex.hsv(raw);

    return ColorSchema().parse({
        hue,
        saturation: saturation / 100,
        value: value / 100
    }) as T;
};
