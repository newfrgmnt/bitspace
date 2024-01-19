import { schema } from '@nodl/core';
import { z } from 'zod';

import { TagSchema } from '../Tag/Tag';

export const Vec3Schema = schema(
    'Vec3',
    z.object({
        type: z.literal('vec3'),
        tag: TagSchema
    })
);
