import { NodeWindowResolver } from '../circuit/containers/Circuit/Circuit.types';
import { Console } from '../nodes/utilities/Console/Console';
import { Image } from '../nodes/ai/SynthesizedImage/SynthesizedImage';
import { ConsoleWindow } from './ConsoleWindow';
import { Node } from '@bitspace/circuit';
import { ImageWindow } from './ImageWindow';
import { HSVWindow } from './HSVWindow';
import { ColorHarmonyWindow } from './ColorHarmonyWindow';
import { TriadHarmony } from '../nodes/color/TriadHarmony/TriadHarmony';
import { TetradicHarmony } from '../nodes/color/TetradicHarmony/TetradicHarmony';
import { SquareHarmony } from '../nodes/color/SquareHarmony/SquareHarmony';
import { ComplementaryHarmony } from '../nodes/color/ComplementaryHarmony/ComplementaryHarmony';
import { AnalogousHarmony } from '../nodes/color/AnalogousHarmony/AnalogousHarmony';
import { FromHSV } from '../nodes/color/FromHSV/FromHSV';
import { CubicBezierWindow } from './CubicBezierWindow';
import { CubicBezier } from '../nodes/easings/CubicBezier/CubicBezier';
import { MeshWindow } from './MeshWindow';
import { Mesh } from '../nodes/3d/Mesh/Mesh';
import { ImageEditWindow } from './ImageEditWindow';
import { ImageEdit } from '../nodes/ai/ImageEdit/ImageEdit';

export const nodeWindowResolver: NodeWindowResolver = (node: Node) => {
    if ('displayName' in node.constructor === false) return <></>;

    // @ts-ignore
    switch (node.constructor.displayName) {
        case 'Console':
            return <ConsoleWindow node={node as Console} />;
        case 'Image':
            return <ImageWindow node={node as Image} />;
        case 'Image Edit':
            return <ImageEditWindow node={node as ImageEdit} />;
        case 'Cubic Bezier':
            return <CubicBezierWindow node={node as CubicBezier} />;
        case 'Mesh':
            return <MeshWindow node={node as Mesh} />;
        case 'Triad Harmony':
        case 'Analogous Harmony':
        case 'Square Harmony':
        case 'Tetradic Harmony':
        case 'Complementary Harmony':
            return (
                <ColorHarmonyWindow
                    node={
                        node as
                            | TriadHarmony
                            | TetradicHarmony
                            | SquareHarmony
                            | ComplementaryHarmony
                            | AnalogousHarmony
                    }
                />
            );
        case 'From HSV':
            return <HSVWindow node={node as FromHSV} />;
    }
};
