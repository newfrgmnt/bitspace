import { schema } from '@bitspace/circuit';
import { z } from 'zod';

export const RGBSchema = schema(
    'RGB',
    z.object({
        red: z.number().min(0).max(1.01),
        green: z.number().min(0).max(1.01),
        blue: z.number().min(0).max(1.01)
    })
);
