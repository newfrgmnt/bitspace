'use client';

import { motion } from 'framer-motion';
import Draggable from 'react-draggable';
import { ColorWheel, combinations } from '../../components/Color/ColorWheel';
import { Circuit } from '../../components/Circuit/Circuit';
import { useState } from 'react';

export default function Page(): JSX.Element {
    return (
        <motion.main className="flex flex-col justify-between h-screen w-screen cursor-[url('/cursor.svg'),auto]">
            <motion.div
                variants={{
                    initial: { opacity: 0 },
                    animate: {
                        opacity: 1,
                        transition: { duration: 1, delay: 1, ease: [0.75, 0, 0.25, 1], staggerChildren: 0.5 }
                    }
                }}
            >
                <Circuit>
                    {Object.keys(combinations).map((combination, i) => (
                        <Wheel key={combination} combination={combination} position={{ x: i * 330 + 400, y: 250 }} />
                    ))}
                </Circuit>
            </motion.div>
        </motion.main>
    );
}

const hsv2rgb = (hue: number, saturation: number, value: number): [number, number, number] => {
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
};

const Wheel = ({ combination, position }: { combination: string; position: { x: number; y: number } }) => {
    const [colors, setColors] = useState<{ hue: number; saturation: number; value: number }[]>([]);

    return (
        <Draggable defaultPosition={position} disabled>
            <motion.div className="flex flex-col items-center gap-y-8 absolute">
                <h3 className="capitalize font-medium">{combination}</h3>
                <div className="relative">
                    <ColorWheel combination={combination as keyof typeof combinations} onChange={setColors} />
                </div>
                <div className="flex flex-row gap-x-4">
                    {colors.map((color, i) => {
                        const [red, green, blue] = hsv2rgb(color.hue, color.saturation, color.value);
                        return (
                            <div
                                key={i}
                                className="w-10 h-10 rounded-full shadow-xl border border-white"
                                style={{
                                    backgroundColor: `rgb(${red}, ${green}, ${blue})`
                                }}
                            />
                        );
                    })}
                </div>
            </motion.div>
        </Draggable>
    );
};
