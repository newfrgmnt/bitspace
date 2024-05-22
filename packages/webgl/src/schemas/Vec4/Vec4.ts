import { z } from 'zod';

import { TagSchema } from '../Tag/Tag';

export const Vec4Schema = () =>
    z
        .object({
            type: z.literal('vec4'),
            tag: TagSchema()
        })
        .describe('Vec4');
