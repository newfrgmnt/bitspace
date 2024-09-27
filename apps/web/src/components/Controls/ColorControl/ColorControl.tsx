import { Input, Output } from '@bitspace/circuit';
import { observer } from 'mobx-react-lite';
import {
    ChangeEventHandler,
    FocusEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import { hsv2rgb } from '../../ColorPicker/ColorPicker.utils';
import { rgb } from 'color-convert';
import clsx from 'clsx';
import { ColorSchemaType, resolveColor } from '@/utils';

export interface ColorControlProps<T extends ColorSchemaType> {
    port: Input<T> | Output<T>;
    disabled?: boolean;
    onBlur?: (value: T) => void;
}

export const ColorControl = observer(function <T extends ColorSchemaType>({
    port,
    disabled,
    onBlur
}: ColorControlProps<T>) {
    const [color, setColor] = useState<T>();

    useEffect(() => {
        const subscription = port.subscribe(v => {
            setColor(v);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [port]);

    const normalizedColor = useMemo(() => {
        if (typeof color === 'string') {
            return color;
        } else if (typeof color === 'object') {
            return rgb.hex(hsv2rgb(color.hue, color.saturation, color.value));
        }

        return '#000000';
    }, [color]);

    const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
        e => {
            if (color) {
                onBlur?.(resolveColor(e.target.value));
            }
        },
        [onBlur, color]
    );

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        e => {
            if (color) {
                port.next(resolveColor(e.target.value));
            }
        },
        [port, color]
    );

    return (
        <div className="flex flex-row items-center gap-4 justify-between bg-white p-2 rounded-full w-full shadow-sm">
            <div className="flex flex-row items-center gap-2">
                <input
                    className={clsx(
                        'rounded-full h-6 w-6 overflow-hidden border border-slate-100 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch-wrapper]:rounded-none',
                        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                    )}
                    type="color"
                    disabled={disabled}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={`#${normalizedColor.replace('#', '')}`}
                />
                <span className="font-mono text-xs">{`#${normalizedColor.replace('#', '')}`}</span>
            </div>
        </div>
    );
});
