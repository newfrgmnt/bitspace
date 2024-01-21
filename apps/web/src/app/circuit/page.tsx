'use client';

import { Fragment, compile, GLSLVersion, Vector4 } from '@bitspace/webgl';
import { useEffect, useMemo, useState } from 'react';
import { Image } from '../../nodes/Image/Image';
import { Node } from '@bitspace/circuit';
import { AnalogousHarmony } from '../../nodes/AnalogousHarmony/AnalogousHarmony';
import { TriadHarmony } from '../../nodes/TriadHarmony/TriadHarmony';
import { ColorWheel } from '../../components/ColorPicker/ColorPicker';
import { hsv2rgb } from '../../components/ColorPicker/ColorPicker.utils';
import { HSV } from '../../nodes/HSV/HSV';
import { Circuit, CircuitStore, StoreContext } from '../../circuit';
import { NodeWindowResolver } from '../../circuit/containers/Circuit/Circuit.types';
import { MenuButton } from '../../components/Menu/MenuButton/MenuButton';
import { Menu } from '../../components/Menu/Menu/Menu';

const ImageWindow = ({ node }: { node: Image }) => {
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

const HSVWindow = ({ node }: { node: HSV }) => {
    const [rgb, setRgb] = useState<[number, number, number]>([0, 0, 0]);

    useEffect(() => {
        node.inputs.color.subscribe(hsv => {
            const rgb = hsv2rgb(hsv.hue, hsv.saturation, hsv.value);
            setRgb(rgb);
        });
    }, [node]);

    const [r, g, b] = rgb;

    return <div className="w-full h-[226px]" style={{ backgroundColor: `rgba(${r}, ${g}, ${b})` }} />;
};

const nodeWindowManager: NodeWindowResolver = (node: Node) => {
    if ('displayName' in node.constructor === false) return <></>;

    switch (node.constructor.displayName) {
        case 'Image':
            return <ImageWindow node={node as Image} />;
        case 'Prompt':
            return (
                <input
                    className="text-black"
                    onBlur={e => node.inputs.prompt?.next(e.target.value)}
                    defaultValue={node.inputs.prompt?.value}
                />
            );
        case 'Triad Harmony':
            return (
                <div className="h-fit w-full">
                    <ColorWheel
                        defaultColor={(node as TriadHarmony).inputs.color.value}
                        radius={113}
                        harmony="triad"
                        onChange={hsv =>
                            hsv && '0' in hsv ? (node as TriadHarmony).inputs.color.next(hsv[0]) : void 0
                        }
                    />
                </div>
            );
        case 'Analogous Harmony':
            return (
                <div className="h-fit w-full">
                    <ColorWheel
                        defaultColor={(node as AnalogousHarmony).inputs.color.value}
                        radius={122}
                        harmony="analogous"
                        onChange={hsv =>
                            hsv && '0' in hsv ? (node as AnalogousHarmony).inputs.color.next(hsv[0]) : void 0
                        }
                    />
                </div>
            );
        case 'HSV':
            return <HSVWindow node={node as HSV} />;
    }
};

export default function Page(): JSX.Element {
    const [menuOpen, setMenuOpen] = useState(false);

    const store = useMemo(() => {
        const circuitStore = new CircuitStore();
        const analogousHarmonyNode = new AnalogousHarmony();
        const hsvNode = new HSV();
        const hsv2Node = new HSV();
        const hsv3Node = new HSV();

        analogousHarmonyNode.outputs.a.connect(hsvNode.inputs.color);
        analogousHarmonyNode.outputs.b.connect(hsv2Node.inputs.color);
        analogousHarmonyNode.outputs.c.connect(hsv3Node.inputs.color);

        circuitStore.setNodes([
            [analogousHarmonyNode, { x: -500, y: 0 }],
            [hsvNode, { x: 0, y: 500 }],
            [hsv2Node, { x: 0, y: 0 }],
            [hsv3Node, { x: 0, y: -500 }]
        ]);

        return circuitStore;
    }, []);

    return (
        <main className="flex flex-col justify-between h-screen w-screen cursor-[url('/cursor.svg')_4_4,auto]">
            <StoreContext.Provider value={{ store }}>
                <Circuit store={store} nodeWindowResolver={nodeWindowManager} />
                {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
            </StoreContext.Provider>
            <div className="fixed left-1/2 bottom-20 -translate-x-1/2 flex flex-row justify-center">
                <MenuButton onClick={() => setMenuOpen(true)} />
            </div>
        </main>
    );
}
