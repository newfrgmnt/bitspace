import type { z } from 'zod';

import { Schema } from './Schema.types';

export function schema<T extends z.Schema>(name: string, schema: T): Schema<T>;
export function schema<T extends z.Schema>(schema: T): Schema<T>;
export function schema<T extends z.Schema>(...args: any[]): Schema<T> {
    if (arguments.length > 1) {
        const [name, schema] = args;

        return {
            name,
            validator: schema
        };
    } else {
        const [schema] = args;

        return {
            name: schema.constructor.name.replace('Zod', ''),
            validator: schema
        };
    }
}
