import { NodeWindowResolver } from '../circuit/containers/Circuit/Circuit.types';
import { Console } from '../../../../packages/nodes/src/utilities/Console/Console';
import { SynthesizedImage } from '../../../../packages/nodes/src/ai/SynthesizedImage/SynthesizedImage';
import { ConsoleWindow } from './ConsoleWindow';
import { Node } from '@bitspace/circuit';
import { ImageWindow } from './ImageWindow';
import { ColorHarmonyWindow } from './ColorHarmonyWindow';
import { TriadHarmony } from '../../../../packages/nodes/src/color/TriadHarmony/TriadHarmony';
import { TetradicHarmony } from '../../../../packages/nodes/src/color/TetradicHarmony/TetradicHarmony';
import { SquareHarmony } from '../../../../packages/nodes/src/color/SquareHarmony/SquareHarmony';
import { ComplementaryHarmony } from '../../../../packages/nodes/src/color/ComplementaryHarmony/ComplementaryHarmony';
import { AnalogousHarmony } from '../../../../packages/nodes/src/color/AnalogousHarmony/AnalogousHarmony';
import { CubicBezierWindow } from './CubicBezierWindow';
import { CubicBezier } from '../../../../packages/nodes/src/easings/CubicBezier/CubicBezier';
import { ImageEditWindow } from './ImageEditWindow';
import { ImageEdit } from '../../../../packages/nodes/src/ai/ImageEdit/ImageEdit';
import { Gradient, Image, Oscillator, Shader } from '@bitspace/nodes';
import { Webcam } from '@bitspace/nodes';
import { WebcamWindow } from './WebcamWindow';
import { OscillatorWindow } from './OscillatorWindow';
import { GradientWindow } from './GradientWindow';
import { ShaderWindow } from './ShaderWindow';

export const nodeWindowResolver: NodeWindowResolver = (node: Node) => {
    if (!('displayName' in node.constructor)) return <></>;

    // @ts-ignore
    switch (node.constructor.displayName) {
        case 'Console':
            return <ConsoleWindow node={node as Console} />;
        case 'Webcam':
            return <WebcamWindow node={node as Webcam} />;
        case 'Image':
        case 'Synthesized Image':
            return <ImageWindow node={node as Image | SynthesizedImage} />;
        case 'Image Edit':
            return <ImageEditWindow node={node as ImageEdit} />;
        case 'Cubic Bezier':
            return <CubicBezierWindow node={node as CubicBezier} />;
        case 'Oscillator':
            return <OscillatorWindow node={node as Oscillator} />;
        case 'Shader':
            return <ShaderWindow node={node as Shader} />;
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
        case 'Gradient':
            return <GradientWindow node={node as Gradient} />;
    }
};
