import { SerializedConnection } from '../Connection/Connection.types';
import { Schema } from '../Schema/Schema.types';

export interface IInputProps<T> {
    name?: string;
    type: Schema;
    defaultValue: T;
}

export interface SerializedInput {
    id: string;
    name: string;
    connection: SerializedConnection | null;
    value: string | null;
}
