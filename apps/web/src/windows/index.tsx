import { NodeWindowResolver } from '../circuit/containers/Circuit/Circuit.types';
import { Console } from '../nodes/utilities/Console/Console';
import { Image } from '../nodes/ai/Image/Image';
import { ConsoleWindow } from './ConsoleWindow';
import { Node } from '@bitspace/circuit';
import { ImageWindow } from './ImageWindow';
import { NodeWindow } from '../circuit/components/Node/Node';
import { HSVWindow } from './HSVWindow';
import { ColorHarmonyWindow } from './ColorHarmonyWindow';
import { TriadHarmony } from '../nodes/color/TriadHarmony/TriadHarmony';
import { TetradicHarmony } from '../nodes/color/TetradicHarmony/TetradicHarmony';
import { SquareHarmony } from '../nodes/color/SquareHarmony/SquareHarmony';
import { ComplementaryHarmony } from '../nodes/color/ComplementaryHarmony/ComplementaryHarmony';
import { AnalogousHarmony } from '../nodes/color/AnalogousHarmony/AnalogousHarmony';
import { HSV } from '../nodes/color/HSV/HSV';
import { CubicBezierWindow } from './CubicBezierWindow';
import { CubicBezier } from '../nodes/easings/CubicBezier/CubicBezier';

export const nodeWindowResolver: NodeWindowResolver = (node: Node) => {
    if ('displayName' in node.constructor === false) return <></>;

    // @ts-ignore
    switch (node.constructor.displayName) {
        case 'Console':
            return <ConsoleWindow node={node as Console} />;
        case 'Image':
            return <ImageWindow node={node as Image} />;
        case 'Prompt':
            return (
                <NodeWindow>
                    <textarea
                        className="text-black"
                        onBlur={e => node.inputs.prompt?.next(e.target.value)}
                        defaultValue={node.inputs.prompt?.value}
                    />
                </NodeWindow>
            );
        case 'Cubic Bezier':
            return <CubicBezierWindow node={node as CubicBezier} />;
        case 'Triad Harmony':
        case 'Analogous Harmony':
        case 'Square Harmony':
        case 'Tetradic Harmony':
        case 'Complementary Harmony':
            return (
                <ColorHarmonyWindow
                    node={
                        node as TriadHarmony | TetradicHarmony | SquareHarmony | ComplementaryHarmony | AnalogousHarmony
                    }
                />
            );
        case 'HSV':
            return <HSVWindow node={node as HSV} />;
    }
};
