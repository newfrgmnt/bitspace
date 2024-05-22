import { z } from 'zod';

import { TagSchema } from '../Tag/Tag';

export const Vec2Schema = () =>
    z
        .object({
            type: z.literal('vec2'),
            tag: TagSchema()
        })
        .describe('Vec2');
