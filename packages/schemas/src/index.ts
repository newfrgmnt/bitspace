import { z } from 'zod';
import { Mesh } from 'three';
import { minMaxNumber } from './utility';

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
        .tuple([
            minMaxNumber(0, 1),
            minMaxNumber(0, 1),
            minMaxNumber(0, 1),
            minMaxNumber(0, 1)
        ])
        .describe('Easing');

export const MeshSchema = () => z.instanceof(Mesh).describe('Mesh');

export * from './utility';
export * from './color';
export * from './gradient';
