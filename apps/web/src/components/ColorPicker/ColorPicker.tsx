import React, {
    ComponentProps,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import {
    harmonies,
    hsv2rgb,
    hsv2xy,
    polar2xy,
    rad2deg,
    xy2polar,
    xy2rgb
} from './ColorPicker.utils';

export type ColorWheelProps = Omit<
    ComponentProps<'div'>,
    'color' | 'onChange'
> & {
    radius: number;
    harmony: keyof typeof harmonies;
    color?: { hue: number; saturation: number; value: number };
    disabled?: boolean;
    defaultColor?: { hue: number; saturation: number; value: number };
    onChange?: (
        colors: { hue: number; saturation: number; value: number }[]
    ) => void;
};

export const ColorWheel = ({
    radius,
    harmony: harmonyName,
    color,
    defaultColor,
    onChange,
    disabled,
    ...props
}: ColorWheelProps) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [position, setPosition] = useState(
        defaultColor
            ? hsv2xy(
                  defaultColor.hue,
                  defaultColor.saturation,
                  defaultColor.value,
                  radius
              )
            : hsv2xy(0, 1, 1, radius)
    );
    const harmony = useMemo(
        () => harmonies[harmonyName],
        [harmonies, harmonyName]
    );

    useEffect(() => {
        if (!ref.current) return;
        const ctx = ref.current.getContext('2d');

        if (!ctx) return;

        ctx.canvas.width = radius * 2;
        ctx.canvas.height = radius * 2;

        drawCircle(ctx);
    }, []);

    useEffect(() => {
        if (color) {
            setPosition(
                hsv2xy(color.hue, color.saturation, color.value, radius)
            );
        }
    }, [color, radius]);

    const handleDrag: DraggableEventHandler = useCallback(
        (e, data) => {
            if (!ref.current) return;

            e.stopPropagation();
            e.preventDefault();

            let [r, phi] = xy2polar(data.x - radius, data.y - radius);
            // Limit radial distance to radius
            r = Math.min(r, radius);
            const [x, y] = polar2xy(r, phi);
            setPosition({ x: x + radius, y: y + radius });
        },
        [radius]
    );

    const harmonyPairs = useMemo(() => {
        const x = position.x - radius;
        const y = position.y - radius;

        const [r, phi] = xy2polar(x, y);

        const hue = rad2deg(phi);
        const saturation = r / radius;
        const value = 1.0;

        const colors = harmony.map(harmonyHue => {
            let newHue = (hue + harmonyHue) % 360;
            newHue = newHue < 0 ? 360 + newHue : newHue;

            const [x, y] = polar2xy(r, newHue * (Math.PI / 180));
            return {
                x: -x + radius,
                y: -y + radius,
                hue: newHue,
                saturation,
                value
            };
        });

        onChange?.([{ hue, saturation, value }, ...colors]);

        return colors;
    }, [position, harmony, polar2xy, onChange, xy2polar, rad2deg, radius]);

    const drawCircle = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            let image = ctx.createImageData(2 * radius, 2 * radius);
            let data = image.data;

            for (let x = -radius; x < radius; x++) {
                for (let y = -radius; y < radius; y++) {
                    let [r, phi] = xy2polar(x, y);

                    let deg = rad2deg(phi);

                    // Figure out the starting index of this pixel in the image data array.
                    let rowLength = 2 * radius;
                    let adjustedX = x + radius; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
                    let adjustedY = y + radius; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
                    let pixelWidth = 4; // each pixel requires 4 slots in the data array
                    let index =
                        (adjustedX + adjustedY * rowLength) * pixelWidth;

                    let hue = deg;
                    let saturation = r / radius;
                    let value = 1.0;

                    let [red, green, blue] = hsv2rgb(hue, saturation, value);
                    let alpha = 255;

                    data[index] = red;
                    data[index + 1] = green;
                    data[index + 2] = blue;
                    data[index + 3] = alpha;
                }
            }

            ctx.putImageData(image, 0, 0);
        },
        [radius]
    );

    const [r, g, b] = useMemo(
        () => xy2rgb(position.x, position.y, radius),
        [position, radius]
    );

    return (
        <div
            className="relative rounded-full overflow-hidden"
            style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`
            }}
            {...props}
        >
            <canvas className="w-full h-full" ref={ref} />
            {harmonyPairs.map((harmony, i) => {
                const [r, g, b] = hsv2rgb(
                    harmony.hue,
                    harmony.saturation,
                    harmony.value
                );
                return (
                    <div
                        key={i}
                        className="rounded-full absolute -top-3 -left-3 w-6 h-6 border-2 border-white shadow-sm"
                        style={{
                            backgroundColor: `rgb(${r}, ${g}, ${b})`,
                            transform: `translate(${harmony.x}px, ${harmony.y}px)`,
                            willChange: 'transform'
                        }}
                    />
                );
            })}
            <Draggable
                onDrag={handleDrag}
                position={position}
                disabled={disabled}
            >
                <div
                    className="rounded-full absolute -top-3 -left-3 w-6 h-6 border-2 border-white shadow-sm flex flex-col items-center justify-center"
                    style={{
                        backgroundColor: `rgb(${r}, ${g}, ${b})`,
                        willChange: 'transform'
                    }}
                >
                    <div className="w-1 h-1 rounded-full bg-white absolute" />
                </div>
            </Draggable>
        </div>
    );
};
