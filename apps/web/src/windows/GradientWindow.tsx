import { useEffect, useState } from 'react';
import { hsv2rgb } from '../components/ColorPicker/ColorPicker.utils';
import { NodeWindow } from '../circuit/components/Node/Node';
import { FromHSV } from '../../../../packages/nodes/src/color/FromHSV/FromHSV';
import { ColorSchema, GradientSchema } from '@bitspace/schemas';
import { Gradient } from '@bitspace/nodes';

const defaultGradient: Zod.infer<ReturnType<typeof GradientSchema>> = {
    type: 'linear',
    colors: [
        { color: { hue: 0, saturation: 0, value: 0 }, position: 0 },
        { color: { hue: 0, saturation: 0, value: 0 }, position: 1 }
    ],
    angle: 0
};

function hsv_to_hsl(h, s, v) {
    // both hsv and hsl values are in [0, 1]
    var l = ((2 - s) * v) / 2;

    if (l != 0) {
        if (l == 1) {
            s = 0;
        } else if (l < 0.5) {
            s = (s * v) / (l * 2);
        } else {
            s = (s * v) / (2 - l * 2);
        }
    }

    return [h, s, l];
}

export const GradientWindow = ({ node }: { node: Gradient }) => {
    const [color, setColor] =
        useState<Zod.infer<ReturnType<typeof GradientSchema>>>(defaultGradient);

    useEffect(() => {
        const subscription = node.outputs.output.subscribe(value => {
            setColor(value as Zod.infer<ReturnType<typeof GradientSchema>>);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [node]);

    const gradient = [
        'linear-gradient(',
        `${color.angle}deg, `,
        `${color.colors
            .map(({ color }) => {
                const [h, s, l] = hsv_to_hsl(
                    color.hue,
                    color.saturation,
                    color.value
                );

                return `hsl(${h} ${s * 100}% ${l * 100}%)`;
            })
            .join(', ')}`,
        ')'
    ].join('');

    return (
        <NodeWindow className="bg-transparent">
            <div
                className="w-full h-[226px] rounded-full"
                style={{
                    background: gradient
                }}
            />
        </NodeWindow>
    );
};
