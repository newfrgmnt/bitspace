import { Input, Output } from '@bitspace/circuit';
import { observer } from 'mobx-react-lite';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

export interface ControlProps {
    port: Input | Output;
}

export const Control = observer(({ port }: ControlProps) => {
    const [value, setValue] = useState<any>();
    const disabled = useMemo(() => port.connected, [port]);

    useEffect(() => {
        const subscription = port.subscribe(value => {
            setValue(value);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [port]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        e => {
            e.preventDefault();
            e.stopPropagation();

            if (port.type.name === 'Number') {
                setValue(parseFloat(e.target.value));
            }
        },
        [port]
    );

    const handleBlur = useCallback(() => {
        port.next(value);
    }, [value]);

    return (
        <input
            className="px-2 py-1 border rounded-md border-slate-200 w-full"
            placeholder={port.type.name}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
});
