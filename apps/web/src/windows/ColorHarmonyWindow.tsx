import { useEffect, useState } from 'react';
import { NodeWindow } from '../circuit/components/Node/Node';
import { ColorWheel } from '../components/ColorPicker/ColorPicker';
import { harmonies } from '../components/ColorPicker/ColorPicker.utils';
import { z } from 'zod';
import { TriadHarmony } from '../nodes/color/TriadHarmony/TriadHarmony';
import { TetradicHarmony } from '../nodes/color/TetradicHarmony/TetradicHarmony';
import { SquareHarmony } from '../nodes/color/SquareHarmony/SquareHarmony';
import { ComplementaryHarmony } from '../nodes/color/ComplementaryHarmony/ComplementaryHarmony';
import { AnalogousHarmony } from '../nodes/color/AnalogousHarmony/AnalogousHarmony';
import { HSVSchema } from '../nodes/schemas';

export const ColorHarmonyWindow = ({
    node
}: {
    node:
        | TriadHarmony
        | TetradicHarmony
        | SquareHarmony
        | ComplementaryHarmony
        | AnalogousHarmony;
}) => {
    const [color, setColor] = useState<z.infer<ReturnType<typeof HSVSchema>>>({
        hue: 0,
        saturation: 0,
        value: 0
    });

    useEffect(() => {
        const subscription = node.inputs.color.subscribe(value => {
            setColor(value);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <NodeWindow className="overflow-hidden rounded-full">
            <ColorWheel
                disabled={node.inputs.color.connected}
                color={color}
                radius={113}
                harmony={
                    (node.constructor as { displayName?: string }).displayName
                        ?.split(' ')[0]
                        ?.toLowerCase() as keyof typeof harmonies
                }
                onChange={hsv => {
                    Object.values(node.outputs).forEach((output, index) => {
                        // @ts-ignore
                        const { hue, saturation, value } = hsv[index];
                        output.next({ hue, saturation, value });
                    });
                }}
            />
        </NodeWindow>
    );
};
