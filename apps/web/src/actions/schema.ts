import { z } from 'zod';

export const verifyOTPSchema = z.object({
    type: z.enum(['email']),
    token: z.string(),
    email: z.string()
});
