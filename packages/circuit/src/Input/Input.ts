import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { IInputProps } from './Input.types';
import { Connection } from '../Connection/Connection';
import { z } from 'zod';

export class Input<TValue = any> extends BehaviorSubject<TValue> {
    /** Identifier */
    public id: string = uuid();
    /** Name */
    public name: string;
    /** Type */
    public type: z.ZodType<TValue, any, any>;
    /** Default Value */
    public defaultValue: TValue;
    /** Associated Connection */
    public connection: Connection<TValue> | null;

    constructor(props: IInputProps<TValue>) {
        super(props.defaultValue);

        this.name = props.name || 'Untitled';
        this.type = props.type;
        this.defaultValue = props.defaultValue;
        this.connection = null;
    }

    /** Determines if input is connected */
    public get connected(): boolean {
        return !!this.connection;
    }

    /** Disposes the Input */
    public dispose(): void {
        this.complete();
        this.connection?.dispose();
        this.connection = null;

        this.unsubscribe();
    }

    /** Parses the value and sends it */
    public next(value: TValue) {
        super.next(this.type.parse(value));
    }
}
