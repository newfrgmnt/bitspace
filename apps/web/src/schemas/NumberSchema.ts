import { schema } from '@bitspace/circuit';
import { z } from 'zod';

export const NumberSchema = schema('Number', z.number());
