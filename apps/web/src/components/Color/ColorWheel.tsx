import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

export const combinations = {
    triad: [120, 240],
    tetradic: [60, 180, 240],
    complementary: [0, 180],
    analogous: [-30, 30],
    square: [90, 180, 270]
} as const;

type CombinationPositionMap = {
    [key in keyof typeof combinations]: { x: number; y: number }[];
};

interface ColorWheelProps {
    combination: keyof typeof combinations;
}

export const ColorWheel = ({ combination }: ColorWheelProps) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [color, setColor] = useState({ hue: 0, saturation: 0, value: 1 });
    const [components, setComponents] = useState<{ x: number; y: number }[]>([]);

    useEffect(() => {
        if (!ref.current) return;
        const ctx = ref.current.getContext('2d');

        if (!ctx) return;

        ctx.canvas.width = ctx.canvas.getBoundingClientRect().width;
        ctx.canvas.height = ctx.canvas.getBoundingClientRect().height;

        drawCircle(ctx);
    }, []);

    const buildComponents = useCallback(
        (r: number, color: { hue: number; saturation: number; value: number }): CombinationPositionMap => {
            const ctx = ref.current?.getContext('2d');

            if (!ctx) throw new Error('No context found');

            return Object.entries(combinations).reduce((acc, [name, combination]) => {
                return {
                    ...acc,
                    [name]: combination
                        .map(hue => (color.hue + hue) % 360)
                        .map(hue => {
                            const [x, y] = polar2xy(r, hue * (Math.PI / 180));
                            return { x: -x + ctx.canvas.width / 2, y: -y + ctx.canvas.height / 2 };
                        })
                };
            }, {}) as CombinationPositionMap;
        },
        [color, polar2xy]
    );

    const handleDrag: DraggableEventHandler = useCallback((e, data) => {
        const ctx = ref.current?.getContext('2d');

        if (!ctx || !(e.target instanceof HTMLDivElement)) return;

        const x = data.x - ctx.canvas.width / 2;
        const y = data.y - ctx.canvas.height / 2;

        const [r, phi] = xy2polar(x, y);

        const hue = rad2deg(phi);
        const saturation = r / (ctx.canvas.width / 2);
        const value = 1.0;

        /* const analogousA = (hue + 30) % 360;
        const [analogousAX, analogousAY] = polar2xy(r, analogousA * (Math.PI / 180));
        setanalogousA({ x: -analogousAX + ctx.canvas.width / 2, y: -analogousAY + ctx.canvas.height / 2 });

        const analogousB = (hue - 30) % 360;
        const [analogousBX, analogousBY] = polar2xy(r, analogousB * (Math.PI / 180));
        setanalogousB({ x: -analogousBX + ctx.canvas.width / 2, y: -analogousBY + ctx.canvas.height / 2 }); */

        setColor({ hue, saturation, value });
        setComponents(buildComponents(r, { hue, saturation, value })[combination]);
    }, []);

    function xy2polar(x: number, y: number): [number, number] {
        let r = Math.sqrt(x * x + y * y);
        let phi = Math.atan2(y, x);
        return [r, phi];
    }
    function polar2xy(r: number, phi: number): [number, number] {
        let x = r * Math.cos(phi);
        let y = r * Math.sin(phi);
        return [x, y];
    }
    // rad in [-π, π] range
    // return degree in [0, 360] range
    function rad2deg(rad: number) {
        return ((rad + Math.PI) / (2 * Math.PI)) * 360;
    }

    function drawCircle(ctx: CanvasRenderingContext2D) {
        let radius = ctx.canvas.width / 2;
        let image = ctx.createImageData(2 * radius, 2 * radius);
        let data = image.data;

        for (let x = -radius; x < radius; x++) {
            for (let y = -radius; y < radius; y++) {
                let [r, phi] = xy2polar(x, y);

                if (r > radius) continue; // skip this pixel because it's outside the circle

                let deg = rad2deg(phi);

                // Figure out the starting index of this pixel in the image data array.
                let rowLength = 2 * radius;
                let adjustedX = x + radius; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
                let adjustedY = y + radius; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
                let pixelWidth = 4; // each pixel requires 4 slots in the data array
                let index = (adjustedX + adjustedY * rowLength) * pixelWidth;

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
    }

    return (
        <div className="relative w-72 h-72">
            <canvas ref={ref} className="w-full h-full" />
            {components.map((position, i) => (
                <Draggable position={position} key={i} disabled>
                    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full border-2 border-white" />
                </Draggable>
            ))}
            <Draggable onDrag={handleDrag} defaultPosition={{ x: 100, y: 100 }}>
                <motion.div className="absolute -top-4 -left-4 w-8 h-8 rounded-full border-2 border-white bg-white" />
            </Draggable>
        </div>
    );
};

// hue in range [0, 360]
// saturation, value in range [0,1]
// return [r,g,b] each in range [0,255]
// See: https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
function hsv2rgb(hue: number, saturation: number, value: number): [number, number, number] {
    let chroma = value * saturation;
    let hue1 = hue / 60;
    let x = chroma * (1 - Math.abs((hue1 % 2) - 1));
    let r1: number = 0,
        g1: number = 0,
        b1: number = 0;
    if (hue1 >= 0 && hue1 <= 1) {
        [r1, g1, b1] = [chroma, x, 0];
    } else if (hue1 >= 1 && hue1 <= 2) {
        [r1, g1, b1] = [x, chroma, 0];
    } else if (hue1 >= 2 && hue1 <= 3) {
        [r1, g1, b1] = [0, chroma, x];
    } else if (hue1 >= 3 && hue1 <= 4) {
        [r1, g1, b1] = [0, x, chroma];
    } else if (hue1 >= 4 && hue1 <= 5) {
        [r1, g1, b1] = [x, 0, chroma];
    } else if (hue1 >= 5 && hue1 <= 6) {
        [r1, g1, b1] = [chroma, 0, x];
    }

    let m = value - chroma;
    let [r, g, b] = [r1 + m, g1 + m, b1 + m];

    // Change r,g,b values from [0,1] to [0,255]
    return [255 * r, 255 * g, 255 * b];
}
