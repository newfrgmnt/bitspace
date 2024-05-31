import { z } from 'zod';
import { Position } from './circuit';
import {
    ColorSchema,
    HSLSchema,
    HSVSchema,
    HexSchema,
    RGBSchema
} from '@bitspace/schemas';
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

export type HexColorSchemaType = z.infer<ReturnType<typeof HexSchema>>;
export type RGBColorSchemaType = z.infer<ReturnType<typeof RGBSchema>>;
export type HSLColorSchemaType = z.infer<ReturnType<typeof HSLSchema>>;
export type HSVColorSchemaType = z.infer<ReturnType<typeof HSVSchema>>;
export type ColorSchemaType = z.infer<ReturnType<typeof ColorSchema>>;

export const resolveColor = <T extends ColorSchemaType>(
    raw: string,
    color: T
): T => {
    if (typeof color === 'object') {
        if ('red' in color) {
            const [red, green, blue] = hex.rgb(raw);

            return RGBSchema().parse({
                red,
                green,
                blue
            }) as T;
        } else if ('hue' in color && 'luminance' in color) {
            const [hue, saturation, luminance] = hex.hsl(raw);

            return HSLSchema().parse({
                hue,
                saturation: saturation / 100,
                luminance: luminance / 100
            }) as T;
        } else {
            const [hue, saturation, value] = hex.hsv(raw);

            return HSVSchema().parse({
                hue,
                saturation: saturation / 100,
                value: value / 100
            }) as T;
        }
    } else {
        return HexSchema().parse(raw) as T;
    }
};
