'use client';

import { Circuit, CircuitStore } from '@nodl/react';
import { Fragment, compile, GLSLVersion, Vector4 } from '@bitspace/webgl';
import { useEffect, useMemo, useState } from 'react';
import { ImageNode } from '../../nodes/ImageNode/ImageNode';
import { NodeWindowResolver } from '@nodl/react/build/containers/Circuit/Circuit.types';
import { Node } from '@bitspace/circuit';
import { PromptNode } from '../../nodes/PromptNode/PromptNode';
import { ColorHarmonyNode } from '../../nodes/ColorHarmonyNode/ColorHarmonyNode';
import { ColorWheel } from '../../components/ColorPicker/ColorPicker';
import { hsv2rgb } from '../../components/ColorPicker/ColorPicker.utils';
import { HSVNode } from '../../nodes/HSVNode/HSVNode';
import { HSVRGBNode } from '../../nodes/HSVRGBNode/HSVRGBNode';
import { NumberFloatNode } from '../../nodes/NumberFloatNode/NumberFloatNode';
import { RGBNode } from '../../nodes/RGBNode/RGBNode';

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
                className="w-full h-80 bg-cover bg-center bg-black"
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
                <ColorWheel
                    color={(node as ColorHarmonyNode).inputs.color.value}
                    radius={130}
                    harmony="analogous"
                    onChange={hsv =>
                        hsv && '0' in hsv ? (node as ColorHarmonyNode).inputs.color.next(hsv[0]) : void 0
                    }
                />
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

        const fragmentNode = new Fragment();
        const vec4Node = new Vector4();
        const hsvToRGBNode = new HSVRGBNode();
        const numberFloatNode = new NumberFloatNode();
        const rgbNode = new RGBNode();
        circuitStore.setNodes([
            [rgbNode, { x: 100, y: 100 }],
            [colorHarmonyNode, { x: -500, y: 100 }],
            [hsvNode, { x: 0, y: -500 }],
            [hsv2Node, { x: 0, y: -700 }],
            [hsv3Node, { x: 0, y: -900 }],
            [fragmentNode, { x: 1000, y: 300 }],
            [vec4Node, { x: 400, y: 300 }],
            [hsvToRGBNode, { x: 800, y: 300 }],
            [numberFloatNode, { x: 800, y: 500 }]
        ]);

        fragmentNode.inputs.color.subscribe(color => {
            const compiled = compile(fragmentNode, {}, GLSLVersion.GLES_300);
            document.getElementById('test')!.innerText = compiled;
        });

        return circuitStore;
    }, []);

    return (
        <main className="flex flex-col justify-between h-screen w-screen cursor-[url('/cursor.svg')_12_12,auto] text-white">
            <header className="flex flex-row justify-center items-center p-12 z-50 fixed top-0 left-0 right-0 bg-gradient-to-b from-[rgba(0,0,0,.2)] to-transparent">
                <h3 className="text-2xl">Bitspace</h3>
            </header>
            <Circuit store={store} nodeWindowResolver={nodeWindowManager} />
            <pre id="test" className="fixed bottom-0 right-0 max-w-xl h-96 overflow-auto"></pre>
        </main>
    );
}
