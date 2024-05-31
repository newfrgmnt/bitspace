import { z } from 'zod';

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
