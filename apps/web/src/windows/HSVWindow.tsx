import { useEffect, useState } from 'react';
import { hsv2rgb } from '../components/ColorPicker/ColorPicker.utils';
import { NodeWindow } from '../circuit/components/Node/Node';
import { FromHSV } from '../../../../packages/nodes/src/color/FromHSV/FromHSV';

export const HSVWindow = ({ node }: { node: FromHSV }) => {
    const [rgb, setRgb] = useState<[number, number, number]>([0, 0, 0]);

    useEffect(() => {
        const subscription = node.inputs.color.subscribe(hsv => {
            const rgb = hsv2rgb(hsv.hue, hsv.saturation, hsv.value);
            setRgb(rgb);
        });

        return () => subscription.unsubscribe();
    }, [node]);

    const [r, g, b] = rgb;

    return (
        <NodeWindow>
            <div
                className="w-full h-[226px]"
                style={{ backgroundColor: `rgba(${r}, ${g}, ${b})` }}
            />
        </NodeWindow>
    );
};
