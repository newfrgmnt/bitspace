import { Input, Output } from '@bitspace/circuit';
import { observer } from 'mobx-react-lite';
import {
    ColorSchema,
    HSLSchema,
    HSVSchema,
    HexSchema,
    RGBSchema
} from '@bitspace/schemas';
import {
    ChangeEventHandler,
    FocusEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import { z } from 'zod';
import { hsv2rgb } from '../../ColorPicker/ColorPicker.utils';
import { hex, hsl, rgb } from 'color-convert';
import clsx from 'clsx';

export type HexColorSchemaType = z.infer<ReturnType<typeof HexSchema>>;
export type RGBColorSchemaType = z.infer<ReturnType<typeof RGBSchema>>;
export type HSLColorSchemaType = z.infer<ReturnType<typeof HSLSchema>>;
export type HSVColorSchemaType = z.infer<ReturnType<typeof HSVSchema>>;
type ColorSchemaType = z.infer<ReturnType<typeof ColorSchema>>;

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
            if ('red' in color) {
                return rgb.hex([color.red, color.green, color.blue]);
            } else if ('hue' in color && 'luminance' in color) {
                return hsl.hex([color.hue, color.saturation, color.luminance]);
            } else {
                return rgb.hex(
                    hsv2rgb(color.hue, color.saturation, color.value)
                );
            }
        }

        return '#000000';
    }, [color]);

    const resolveColor = useCallback(
        (v: string): T => {
            if (typeof color === 'object') {
                if ('red' in color) {
                    const [red, green, blue] = hex.rgb(v);

                    return RGBSchema().parse({
                        red,
                        green,
                        blue
                    }) as T;
                } else if ('hue' in color && 'luminance' in color) {
                    const [hue, saturation, luminance] = hex.hsl(v);

                    return HSLSchema().parse({
                        hue,
                        saturation: saturation / 100,
                        luminance: luminance / 100
                    }) as T;
                } else {
                    const [hue, saturation, value] = hex.hsv(v);

                    return HSVSchema().parse({
                        hue,
                        saturation: saturation / 100,
                        value: value / 100
                    }) as T;
                }
            } else {
                return HexSchema().parse(v) as T;
            }
        },
        [color]
    );

    const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback(
        e => {
            onBlur?.(resolveColor(e.target.value));
        },
        [onBlur, color]
    );

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        e => {
            port.next(resolveColor(e.target.value));
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
