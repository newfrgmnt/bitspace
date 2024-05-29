import { Input, Output } from '@bitspace/circuit';
import { Switch } from '@bitspace/ui/switch';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';

export interface BooleanControlProps {
    port: Input<boolean> | Output<boolean>;
    disabled?: boolean;
    onBlur?: (value: boolean) => void;
}

export const BooleanControl = observer(
    ({ port, disabled, onBlur }: BooleanControlProps) => {
        const [value, setValue] = useState<boolean>(false);

        useEffect(() => {
            const subscription = port.subscribe(value => {
                setValue(value);
            });

            return () => {
                subscription.unsubscribe();
            };
        }, [port]);

        const handleChange = useCallback(
            (checked: boolean) => {
                port.next(checked);
                onBlur?.(checked);
            },
            [port, onBlur]
        );

        return (
            <Switch
                checked={value}
                onCheckedChange={handleChange}
                disabled={disabled}
            />
        );
    }
);
