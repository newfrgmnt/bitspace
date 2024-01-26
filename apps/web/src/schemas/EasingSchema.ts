import { schema } from '@bitspace/circuit';
import { z } from 'zod';

export const EasingSchema = schema('Easing', z.function().args(z.number().min(0).max(1)).returns(z.number()));
