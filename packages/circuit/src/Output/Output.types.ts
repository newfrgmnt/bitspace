import { Observable } from 'rxjs';

import { SerializedConnection } from '../Connection/Connection.types';
import { z } from 'zod';

export interface IOutputProps<T> {
    name?: string;
    type: z.ZodType<T, any, any>;
    observable: Observable<T>;
}

export interface SerializedOutput {
    id: string;
    name: string;
    connections: SerializedConnection[];
}
