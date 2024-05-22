import { schema } from '@bitspace/circuit';
import { z } from 'zod';
import { Mesh } from 'three';

/** UTILITY SCHEMAS */

export const minMaxNumber = (
    min: number = -Infinity,
    max: number = Infinity,
    wrapAround?: boolean
) =>
    z.coerce
        .number()
        .transform(value => (wrapAround && max ? value % max : value))
        .transform(value => Math.min(Math.max(value, min), max))
        .pipe(z.number().min(min).max(max));

/** PUBLIC SCHEMAS */

export const AnySchema = () => schema('Any', z.any());
export const StringSchema = () => schema('String', z.coerce.string());
export const ImageSchema = () => schema('Image', z.string().url());
export const NumberSchema = (...args: Parameters<typeof minMaxNumber>) =>
    schema('Number', minMaxNumber(...args));

export const EasingSchema = () =>
    schema(
        'Easing',
        z.function().args(z.number().min(0).max(1)).returns(z.number())
    );

export const MeshSchema = () => schema('Mesh', z.instanceof(Mesh));

/** COLORS */

export const HSVSchema = () =>
    schema(
        'HSV',
        z.object({
            hue: minMaxNumber(0, 360, true),
            saturation: minMaxNumber(0, 1),
            value: minMaxNumber(0, 1)
        })
    );

export const HSLSchema = () =>
    schema(
        'HSL',
        z.object({
            hue: minMaxNumber(0, 360, true),
            saturation: minMaxNumber(0, 1),
            luminance: minMaxNumber(0, 1)
        })
    );

export const RGBSchema = () =>
    schema(
        'RGB',
        z.object({
            red: minMaxNumber(0, 1),
            green: minMaxNumber(0, 1),
            blue: minMaxNumber(0, 1)
        })
    );

export const HexSchema = () =>
    schema('Hex', z.string().startsWith('#').min(4).max(7));

export const ColorSchema = () =>
    schema(
        'Color',
        z.union([
            HSVSchema().validator,
            HSLSchema().validator,
            RGBSchema().validator,
            HexSchema().validator
        ])
    );
