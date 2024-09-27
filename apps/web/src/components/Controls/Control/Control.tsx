import { Input, Output } from '@bitspace/circuit';
import { observer } from 'mobx-react-lite';
import { NumberControl } from '../NumberControl/NumberControl';
import { StringControl } from '../StringControl/StringControl';
import { ColorControl } from '../ColorControl/ColorControl';
import { BooleanControl } from '../BooleanControl/BooleanControl';
import { ColorSchemaType } from '@/utils';

export interface ControlProps {
    port: Input | Output;
    disabled?: boolean;
    onBlur?: (value: any) => void;
}

export const Control = observer(({ port, disabled, onBlur }: ControlProps) => {
    switch (port.type.description) {
        case 'Boolean':
            return (
                <BooleanControl
                    port={port}
                    disabled={disabled}
                    onBlur={onBlur}
                />
            );
        case 'String':
        case 'URL':
            return (
                <StringControl
                    port={port}
                    disabled={disabled}
                    onBlur={onBlur}
                />
            );
        case 'Number':
            return (
                <NumberControl
                    port={port}
                    disabled={disabled}
                    onBlur={onBlur}
                />
            );
        case 'Color':
            return (
                <ColorControl<ColorSchemaType>
                    port={port}
                    disabled={disabled}
                    onBlur={onBlur}
                />
            );
    }
});
