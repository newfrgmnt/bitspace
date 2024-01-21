import { NodeWindowResolver } from '../../circuit/containers/Circuit/Circuit.types';
import { Console } from '../../nodes/Console/Console';
import { Image } from '../../nodes/Image/Image';
import { ConsoleWindow } from './ConsoleWindow';
import { Node } from '@bitspace/circuit';
import { ImageWindow } from './ImageWindow';
import { NodeWindow } from '../../circuit/components/Node/Node';
import { ColorWheel } from '../../components/ColorPicker/ColorPicker';
import { TriadHarmony } from '../../nodes/TriadHarmony/TriadHarmony';
import { harmonies } from '../../components/ColorPicker/ColorPicker.utils';
import { HSVWindow } from './HSVWindow';
import { HSV } from '../../nodes/HSV/HSV';

export const nodeWindowResolver: NodeWindowResolver = (node: Node) => {
    if ('displayName' in node.constructor === false) return <></>;

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
        case 'Triad Harmony':
        case 'Analogous Harmony':
        case 'Square Harmony':
        case 'Tetradic Harmony':
        case 'Complementary Harmony':
            return (
                <NodeWindow className="overflow-hidden rounded-full">
                    <ColorWheel
                        defaultColor={(node as TriadHarmony).inputs.color.value}
                        radius={113}
                        harmony={node.constructor.displayName.split(' ')[0]?.toLowerCase() as keyof typeof harmonies}
                        onChange={hsv =>
                            hsv && '0' in hsv ? (node as TriadHarmony).inputs.color.next(hsv[0]) : void 0
                        }
                    />
                </NodeWindow>
            );
        case 'HSV':
            return <HSVWindow node={node as HSV} />;
        default:
            return <></>;
    }
};
