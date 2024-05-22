import { z } from 'zod';
import { SerializedConnection } from '../Connection/Connection.types';

export interface IInputProps<T> {
    name?: string;
    type: z.ZodType<T, any, any>;
    defaultValue: T;
}

export interface SerializedInput {
    id: string;
    name: string;
    connection: SerializedConnection | null;
    value: string | null;
}
