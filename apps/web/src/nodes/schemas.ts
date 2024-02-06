import { schema } from '@bitspace/circuit';
import { z } from 'zod';

export const AnySchema = schema('Any', z.any());
export const StringSchema = schema('String', z.string());
export const NumberSchema = schema('Number', z.number());

export const EasingSchema = schema('Easing', z.function().args(z.number().min(0).max(1)).returns(z.number()));

export const HSVSchema = schema(
    'HSV',
    z.object({
        hue: z.number().min(0).max(360.1),
        saturation: z.number().min(0).max(1.1),
        value: z.number().min(0).max(1.1)
    })
);

export const HSLSchema = schema(
    'HSV',
    z.object({
        hue: z.number().min(0).max(360.1),
        saturation: z.number().min(0).max(1.1),
        luminance: z.number().min(0).max(1.1)
    })
);

export const RGBSchema = schema(
    'RGB',
    z.object({
        red: z.number().min(0).max(1.01),
        green: z.number().min(0).max(1.01),
        blue: z.number().min(0).max(1.01)
    })
);

export const ImageSchema = schema('Image', z.string().url());
