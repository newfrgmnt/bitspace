import { z } from 'zod';

import { TagSchema } from '../Tag/Tag';

export const Vec3Schema = () =>
    z
        .object({
            type: z.literal('vec3'),
            tag: TagSchema()
        })
        .describe('Vec3');
