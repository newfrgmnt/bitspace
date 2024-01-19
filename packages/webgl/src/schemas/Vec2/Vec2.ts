import { schema } from '@nodl/core';
import { z } from 'zod';

import { TagSchema } from '../Tag/Tag';

export const Vec2Schema = schema(
    'Vec2',
    z.object({
        type: z.literal('vec2'),
        tag: TagSchema
    })
);
