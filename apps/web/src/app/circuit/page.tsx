'use client';

import { Fragment, compile, GLSLVersion, Vector4 } from '@bitspace/webgl';
import { useEffect, useMemo, useState } from 'react';
import { ImageNode } from '../../nodes/ImageNode/ImageNode';
import { Node } from '@bitspace/circuit';
import { ColorHarmonyNode } from '../../nodes/ColorHarmonyNode/ColorHarmonyNode';
import { ColorWheel } from '../../components/ColorPicker/ColorPicker';
import { hsv2rgb } from '../../components/ColorPicker/ColorPicker.utils';
import { HSVNode } from '../../nodes/HSVNode/HSVNode';
import { HSVRGBNode } from '../../nodes/HSVRGBNode/HSVRGBNode';
import { NumberFloatNode } from '../../nodes/NumberFloatNode/NumberFloatNode';
import { RGBNode } from '../../nodes/RGBNode/RGBNode';
import { Circuit, CircuitStore } from '../../circuit';
import { NodeWindowResolver } from '../../circuit/containers/Circuit/Circuit.types';
import { MenuButton } from '../../components/Menu/MenuButton/MenuButton';

const ImageWindow = ({ node }: { node: ImageNode }) => {
    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {
        node.outputs.output.subscribe(value => {
            setImageSrc(value);
        });
    }, [node]);

    return (
        <>
            <input
                className="text-black"
                onBlur={e => node.inputs.prompt.next(e.target.value)}
                defaultValue={node.inputs.prompt.value}
            />
            <div
                className="w-[244px] h-80 bg-cover bg-center bg-slate-100"
                style={{
                    backgroundImage: `url(${imageSrc})`
                }}
            />
        </>
    );
};

const HSVWindow = ({ node }: { node: HSVNode }) => {
    const [rgb, setRgb] = useState<[number, number, number]>([0, 0, 0]);

    useEffect(() => {
        node.inputs.color.subscribe(hsv => {
            const rgb = hsv2rgb(hsv.hue, hsv.saturation, hsv.value);
            setRgb(rgb);
        });
    }, [node]);

    const [r, g, b] = rgb;

    return <div className="w-full h-[260px]" style={{ backgroundColor: `rgba(${r}, ${g}, ${b})` }} />;
};

const nodeWindowManager: NodeWindowResolver = (node: Node) => {
    switch (node.name) {
        case 'Image':
            return <ImageWindow node={node as ImageNode} />;
        case 'Prompt':
            return (
                <input
                    className="text-black"
                    onBlur={e => node.inputs.prompt?.next(e.target.value)}
                    defaultValue={node.inputs.prompt?.value}
                />
            );
        case 'Color Harmony':
            return (
                <div className="h-fit w-full">
                    <ColorWheel
                        defaultColor={(node as ColorHarmonyNode).inputs.color.value}
                        radius={122}
                        harmony="triad"
                        onChange={hsv =>
                            hsv && '0' in hsv ? (node as ColorHarmonyNode).inputs.color.next(hsv[0]) : void 0
                        }
                    />
                </div>
            );
        case 'HSV':
            return <HSVWindow node={node as HSVNode} />;
    }
};

export default function Page(): JSX.Element {
    const store = useMemo(() => {
        const circuitStore = new CircuitStore();
        const colorHarmonyNode = new ColorHarmonyNode();
        const hsvNode = new HSVNode();
        const hsv2Node = new HSVNode();
        const hsv3Node = new HSVNode();

        colorHarmonyNode.outputs.a.connect(hsvNode.inputs.color);
        colorHarmonyNode.outputs.b.connect(hsv2Node.inputs.color);
        colorHarmonyNode.outputs.c.connect(hsv3Node.inputs.color);

        circuitStore.setNodes([
            [colorHarmonyNode, { x: -500, y: 0 }],
            [hsvNode, { x: 0, y: 500 }],
            [hsv2Node, { x: 0, y: 0 }],
            [hsv3Node, { x: 0, y: -500 }]
        ]);

        return circuitStore;
    }, []);

    return (
        <main className="flex flex-col justify-between h-screen w-screen cursor-[url('/cursor.svg')_12_12,auto]">
            <header className="flex flex-row justify-center items-center p-20 z-50 fixed top-0 left-0 right-0 pointer-events-none">
                <h3 className="text-2xl">Bitspace</h3>
            </header>
            <Circuit store={store} nodeWindowResolver={nodeWindowManager} />
            <div className="fixed bottom-20 left-0 right-0 flex flex-row justify-center">
                <MenuButton />
            </div>
        </main>
    );
}
