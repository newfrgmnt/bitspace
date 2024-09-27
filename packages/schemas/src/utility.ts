import { z } from 'zod';

export const minMaxNumber = (
    min: number = -Infinity,
    max: number = Infinity,
    wrapAround?: boolean,
    defaultValue?: number
) =>
    z.coerce
        .number()
        .transform(value => (wrapAround && max ? value % max : value))
        .transform(value => Math.min(Math.max(value, min), max))
        .pipe(z.number().min(min).max(max))
        .default(defaultValue ?? 0)
        .describe('Number');
