import { schema } from '@nodl/core';
import { z } from 'zod';

import { FloatSchema } from '../Float/Float';
import { Vec2Schema } from '../Vec2/Vec2';
import { Vec3Schema } from '../Vec3/Vec3';
import { Vec4Schema } from '../Vec4/Vec4';

export const PrimTypeSchema = z.enum(['float', 'vec2', 'vec3', 'vec4']);

export const PrimSchema = schema(
    'Prim',
    z.union([FloatSchema.validator, Vec2Schema.validator, Vec3Schema.validator, Vec4Schema.validator])
);
