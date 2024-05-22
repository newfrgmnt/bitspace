import { z } from 'zod';

import { FloatSchema } from '../Float/Float';
import { Vec2Schema } from '../Vec2/Vec2';
import { Vec3Schema } from '../Vec3/Vec3';
import { Vec4Schema } from '../Vec4/Vec4';

export const PrimTypeSchema = () => z.enum(['float', 'vec2', 'vec3', 'vec4']).describe('Prim Type');

export const PrimSchema = () => z.union([FloatSchema(), Vec2Schema(), Vec3Schema(), Vec4Schema()]).describe('Prim');
