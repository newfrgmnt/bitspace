import { useEffect, useState } from 'react';
import { HSV } from '../nodes/HSV/HSV';
import { hsv2rgb } from '../components/ColorPicker/ColorPicker.utils';
import { NodeWindow } from '../circuit/components/Node/Node';

export const HSVWindow = ({ node }: { node: HSV }) => {
    const [rgb, setRgb] = useState<[number, number, number]>([0, 0, 0]);

    useEffect(() => {
        node.inputs.color.subscribe(hsv => {
            const rgb = hsv2rgb(hsv.hue, hsv.saturation, hsv.value);
            setRgb(rgb);
        });
    }, [node]);

    const [r, g, b] = rgb;

    return (
        <NodeWindow>
            <div className="w-full h-[226px]" style={{ backgroundColor: `rgba(${r}, ${g}, ${b})` }} />
        </NodeWindow>
    );
};
