import { z } from 'zod';
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

export const GamepadSchema = () => z.instanceof(Gamepad).describe('Gamepad');

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

export const Vector2Schema = (...args: Parameters<typeof minMaxNumber>) =>
    z
        .object({
            x: minMaxNumber(...args),
            y: minMaxNumber(...args)
        })
        .describe('2D Vector');

export const Vector3Schema = (...args: Parameters<typeof minMaxNumber>) =>
    z
        .object({
            x: minMaxNumber(...args),
            y: minMaxNumber(...args),
            z: minMaxNumber(...args)
        })
        .describe('3D Vector');

export const Vector4Schema = (...args: Parameters<typeof minMaxNumber>) =>
    z
        .object({
            x: minMaxNumber(...args),
            y: minMaxNumber(...args),
            z: minMaxNumber(...args),
            w: minMaxNumber(...args)
        })
        .describe('4D Vector');

export const VectorSchema = (...args: Parameters<typeof minMaxNumber>) =>
    z
        .union([
            Vector2Schema(...args),
            Vector3Schema(...args),
            Vector4Schema(...args)
        ])
        .describe('Vector');

export * from './utility';
export * from './color';
export * from './gradient';
