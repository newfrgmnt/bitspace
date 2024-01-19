import { schema } from '@bitspace/circuit';
import { z } from 'zod';

import { TagSchema } from '../Tag/Tag';

export const Vec2Schema = schema(
    'Vec2',
    z.object({
        type: z.literal('vec2'),
        tag: TagSchema
    })
);
