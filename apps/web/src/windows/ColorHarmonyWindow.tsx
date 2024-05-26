import { useEffect, useState } from 'react';
import { NodeWindow } from '../circuit/components/Node/Node';
import { ColorWheel } from '../components/ColorPicker/ColorPicker';
import { harmonies } from '../components/ColorPicker/ColorPicker.utils';
import { z } from 'zod';
import { TriadHarmony } from '../../../../packages/nodes/src/color/TriadHarmony/TriadHarmony';
import { TetradicHarmony } from '../../../../packages/nodes/src/color/TetradicHarmony/TetradicHarmony';
import { SquareHarmony } from '../../../../packages/nodes/src/color/SquareHarmony/SquareHarmony';
import { ComplementaryHarmony } from '../../../../packages/nodes/src/color/ComplementaryHarmony/ComplementaryHarmony';
import { AnalogousHarmony } from '../../../../packages/nodes/src/color/AnalogousHarmony/AnalogousHarmony';
import { HSVSchema } from '../../../../packages/schemas/src';

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
