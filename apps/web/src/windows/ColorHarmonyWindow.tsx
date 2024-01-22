import { useEffect, useState } from 'react';
import { NodeWindow } from '../circuit/components/Node/Node';
import { ColorWheel } from '../components/ColorPicker/ColorPicker';
import { harmonies } from '../components/ColorPicker/ColorPicker.utils';
import { AnalogousHarmony, HSVSchema } from '../nodes/AnalogousHarmony/AnalogousHarmony';
import { ComplementaryHarmony } from '../nodes/ComplementaryHarmony/ComplementaryHarmony';
import { SquareHarmony } from '../nodes/SquareHarmony/SquareHarmony';
import { TetradicHarmony } from '../nodes/TetradicHarmony/TetradicHarmony';
import { TriadHarmony } from '../nodes/TriadHarmony/TriadHarmony';
import { z } from 'zod';

export const ColorHarmonyWindow = ({
    node
}: {
    node: TriadHarmony | TetradicHarmony | SquareHarmony | ComplementaryHarmony | AnalogousHarmony;
}) => {
    const [color, setColor] = useState<z.infer<typeof HSVSchema.validator>>({ hue: 0, saturation: 0, value: 0 });

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
                color={color}
                radius={113}
                harmony={
                    (node.constructor as { displayName?: string }).displayName
                        ?.split(' ')[0]
                        ?.toLowerCase() as keyof typeof harmonies
                }
                // onChange={hsv => (hsv && '0' in hsv ? (node as TriadHarmony).inputs.color.next(hsv[0]) : void 0)}
            />
        </NodeWindow>
    );
};
