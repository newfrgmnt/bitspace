import { action, computed, makeObservable, observable } from 'mobx';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Connection } from '../Connection/Connection';
import { Input } from '../Input/Input';
import { IOutputProps } from './Output.types';
import { Schema } from '../Schema/Schema.types';

export class Output<TValue = any> extends ReplaySubject<TValue> {
    /** Identifier */
    public id: string = uuid();
    /** Name */
    public name: string;
    /** Type */
    public type: Schema;
    /** Compute operation */
    public observable: Observable<TValue>;
    /** Value Operator subscription */
    public subscription: Subscription;
    /** Associated Connections */
    public connections: Connection<TValue>[];
    /** Optional Loading State */
    public loading: boolean = false;

    constructor(props: IOutputProps<TValue>) {
        super(1);

        this.name = props.name || 'Untitled';
        this.type = props.type;
        this.observable = props.observable;
        this.subscription = this.observable.subscribe(this);
        this.connections = [];

        makeObservable(this, {
            id: observable,
            name: observable,
            type: observable,
            observable: observable,
            subscription: observable,
            connections: observable,
            loading: observable,
            connected: computed,
            connect: action,
            setLoading: action,
            resetLoading: action,
            dispose: action
        });
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

        this.subscription.unsubscribe();
        this.unsubscribe();
    }

    /** Parses the value and sends it */
    public next(value: TValue) {
        super.next(this.type.validator.parse(value));
    }
}
