import { Input, Output } from '@bitspace/circuit';
import { observer } from 'mobx-react-lite';
import { NumberControl } from '../NumberControl/NumberControl';

export interface ControlProps {
    port: Input | Output;
    disabled?: boolean;
    onBlur?: (value: any) => void;
}

export const Control = observer(({ port, disabled, onBlur }: ControlProps) => {
    switch (port.type.name) {
        case 'Number':
            return <NumberControl port={port} disabled={disabled} onBlur={onBlur} />;
    }
});
