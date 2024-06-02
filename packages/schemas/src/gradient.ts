import { z } from 'zod';
import { ColorSchema, HSVSchema, minMaxNumber } from '.';

const GradientType = z.enum(['linear', 'radial', 'conic']);

const ColorStop = z.object({
    color: HSVSchema(),
    position: minMaxNumber(0, 1)
});

export const GradientSchema = () =>
    z
        .object({
            type: GradientType,
            colors: z.array(ColorStop).min(2),
            angle: minMaxNumber(0, 360, true).default(0)
        })
        .describe('Gradient');
