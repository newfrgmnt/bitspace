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
                const [r, g, b] = hsv2rgb(
                    color.hue,
                    color.saturation,
                    color.value
                );

                return `rgb(${r}, ${g}, ${b})`;
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
