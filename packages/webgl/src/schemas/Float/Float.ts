import { schema } from '@bitspace/circuit';
import { z } from 'zod';

import { TagSchema } from '../Tag/Tag';

export const FloatSchema = schema(
    'Float',
    z.object({
        type: z.literal('float'),
        tag: TagSchema
    })
);
