import { Input, Output } from '@bitspace/circuit';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, useCallback, useEffect, useState } from 'react';

export interface NumberControlProps {
    port: Input<number> | Output<number>;
    disabled?: boolean;
    onBlur?: (value: any) => void;
}

export const NumberControl = observer(({ port, disabled, onBlur }: NumberControlProps) => {
    const [value, setValue] = useState<any>();

    useEffect(() => {
        const subscription = port.subscribe(value => {
            setValue(value);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [port]);

    const handleKeydown: KeyboardEventHandler<HTMLInputElement> = useCallback(e => {
        e.stopPropagation();
    }, []);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        e => {
            if (port.type.name === 'Number') {
                port.next(port.type.validator.parse(parseFloat(e.target.value)));
            }
        },
        [port]
    );

    const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
        e => {
            if (port.type.name === 'Number') {
                onBlur?.(port.type.validator.parse(parseFloat(e.target.value)));
            }
        },
        [onBlur]
    );

    return (
        <input
            className={clsx('px-3 py-2 rounded-xl w-full shadow-sm border border-slate-100', {
                'text-slate-400': disabled
            })}
            type="number"
            step={0.01}
            placeholder={port.type.name}
            onKeyDown={handleKeydown}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
});
