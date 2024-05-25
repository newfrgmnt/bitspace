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
        .pipe(z.number().min(min).max(max))
        .describe('Number');

/** PUBLIC SCHEMAS */

export const AnySchema = () => z.any().describe('Any');
export const BooleanSchema = () => z.coerce.boolean().describe('Boolean');
export const StringSchema = () => z.coerce.string().describe('String');
export const URLSchema = () => z.string().url().describe('URL');

export const ImageSchema = () =>
    z
        .string()
        .url()
        .refine(arg => {
            const fileExtension = arg.split('.').pop()?.toLocaleLowerCase();

            return (
                fileExtension?.includes('jpg') ||
                fileExtension?.includes('jpeg') ||
                fileExtension?.includes('png')
            );
        })
        .describe('Image');

export const MediaStreamSchema = () =>
    z.instanceof(MediaStream).describe('Media Stream');

export const NumberSchema = (...args: Parameters<typeof minMaxNumber>) =>
    minMaxNumber(...args).describe('Number');

export const EasingSchema = () =>
    z
        .function()
        .args(z.number().min(0).max(1))
        .returns(z.number())
        .describe('Easing');

export const MeshSchema = () => z.instanceof(Mesh).describe('Mesh');

/** COLORS */

export const HSVSchema = () =>
    z
        .object({
            hue: minMaxNumber(0, 360, true),
            saturation: minMaxNumber(0, 1),
            value: minMaxNumber(0, 1)
        })
        .describe('HSV');

export const HSLSchema = () =>
    z
        .object({
            hue: minMaxNumber(0, 360, true),
            saturation: minMaxNumber(0, 1),
            luminance: minMaxNumber(0, 1)
        })
        .describe('HSL');

export const RGBSchema = () =>
    z
        .object({
            red: minMaxNumber(0, 1),
            green: minMaxNumber(0, 1),
            blue: minMaxNumber(0, 1)
        })
        .describe('RGB');

export const HexSchema = () =>
    z.string().startsWith('#').min(4).max(7).describe('Hex');

export const ColorSchema = () =>
    z
        .union([HSVSchema(), HSLSchema(), RGBSchema(), HexSchema()])
        .describe('Color');
