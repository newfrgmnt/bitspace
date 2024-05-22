import { z } from 'zod';

import { TagSchema } from '../Tag/Tag';

export const FloatSchema = () =>
    z
        .object({
            type: z.literal('float'),
            tag: TagSchema()
        })
        .describe('Float');
