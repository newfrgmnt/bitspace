import { schema } from '@nodl/core';
import { z } from 'zod';

import { TagSchema } from '../Tag/Tag';

export const Vec4Schema = schema(
    'Vec4',
    z.object({
        type: z.literal('vec4'),
        tag: TagSchema
    })
);
