import { Input, Output } from '@bitspace/circuit';
import { observer } from 'mobx-react-lite';
import { NumberControl } from '../NumberControl/NumberControl';
import { StringControl } from '../StringControl/StringControl';
import {
    ColorControl,
    HSLColorSchemaType,
    HSVColorSchemaType,
    HexColorSchemaType,
    RGBColorSchemaType
} from '../ColorControl/ColorControl';

export interface ControlProps {
    port: Input | Output;
    disabled?: boolean;
    onBlur?: (value: any) => void;
}

export const Control = observer(({ port, disabled, onBlur }: ControlProps) => {
    switch (port.type.name) {
        case 'String':
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
        case 'HEX':
            return (
                <ColorControl<HexColorSchemaType>
                    port={port}
                    disabled={disabled}
                    onBlur={onBlur}
                />
            );
        case 'RGB':
            return (
                <ColorControl<RGBColorSchemaType>
                    port={port}
                    disabled={disabled}
                    onBlur={onBlur}
                />
            );
        case 'HSL':
            return (
                <ColorControl<HSLColorSchemaType>
                    port={port}
                    disabled={disabled}
                    onBlur={onBlur}
                />
            );
        case 'HSV':
            return (
                <ColorControl<HSVColorSchemaType>
                    port={port}
                    disabled={disabled}
                    onBlur={onBlur}
                />
            );
    }
});
