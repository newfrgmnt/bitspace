import { Observable } from 'rxjs';

import { Schema } from '../Schema/Schema.types';
import { SerializedConnection } from '../Connection/Connection.types';

export interface IOutputProps<T> {
    name?: string;
    type: Schema;
    observable: Observable<T>;
}

export interface SerializedOutput {
    id: string;
    name: string;
    connections: SerializedConnection[];
}
