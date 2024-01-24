import { schema } from '@bitspace/circuit';
import { z } from 'zod';

export const HSVSchema = schema(
    'HSV',
    z.object({
        hue: z.number().min(0).max(360.1),
        saturation: z.number().min(0).max(1.1),
        value: z.number().min(0).max(1.1)
    })
);
