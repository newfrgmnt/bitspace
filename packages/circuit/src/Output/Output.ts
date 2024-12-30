import {
    ReplaySubject
} from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Connection } from '../Connection/Connection';
import { Input } from '../Input/Input';
import { IOutputProps } from './Output.types';
import { z } from 'zod';

export class Output<TValue = any> extends ReplaySubject<TValue> {
    /** Identifier */
    public id: string = uuid();
    /** Name */
    public name: string;
    /** Type */
    public type: z.ZodType<TValue, any, any>;
    /** Associated Connections */
    public connections: Connection<TValue>[];
    /** Optional Loading State */
    public loading: boolean = false;

    constructor(props: IOutputProps<TValue>) {
        super(1);

        this.name = props.name || 'Untitled';
        this.type = props.type;
        props.observable.subscribe(this);
        this.connections = [];
    }

    /** Determines if output is connected */
    public get connected(): boolean {
        return this.connections.length > 0;
    }

    /** Connects the output with a compatible input port */
    public connect(
        input: Input<TValue>,
        onValidationFail?: (fromId: string, toId: string) => void
    ): Connection<TValue> {
        return new Connection(this, input, onValidationFail);
    }

    /** Sets the loading state */
    public setLoading() {
        this.loading = true;
    }

    /** Flushes the loading state */
    public resetLoading() {
        this.loading = false;
    }

    /** Disposes the Output */
    public dispose() {
        for (const connection of this.connections) {
            connection.dispose();
        }

        this.connections = [];

        this.unsubscribe();
    }

    /** Parses the value and sends it */
    public next(value: TValue) {
        super.next(this.type.parse(value));
    }
}
