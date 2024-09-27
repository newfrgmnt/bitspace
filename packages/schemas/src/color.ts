import { z } from 'zod';
import { minMaxNumber } from './utility';

export const ColorSchema = () =>
    z
        .object({
            hue: minMaxNumber(0, 360, true),
            saturation: minMaxNumber(0, 1),
            value: minMaxNumber(0, 1)
        })
        .describe('Color');
