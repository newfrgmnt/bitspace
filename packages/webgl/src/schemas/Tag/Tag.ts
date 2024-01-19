import { z } from 'zod';

export const TagSchema = z.enum([
    'arg',
    'array_init',
    'assign',
    'call',
    'call_i',
    'ctrl',
    'decl',
    'fn',
    'for',
    'idx',
    'idxm',
    'if',
    'lit',
    'op1',
    'op2',
    'ret',
    'scope',
    'swizzle',
    'sym',
    'ternary',
    'while'
]);
