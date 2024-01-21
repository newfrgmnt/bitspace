'use client';

import { useMemo, useState } from 'react';
import { AnalogousHarmony } from '../../nodes/AnalogousHarmony/AnalogousHarmony';
import { HSV } from '../../nodes/HSV/HSV';
import { Circuit, CircuitStore, StoreContext } from '../../circuit';
import { MenuButton } from '../../components/Menu/MenuButton/MenuButton';
import { Menu } from '../../components/Menu/Menu/Menu';
import { nodeWindowResolver } from '../windows';

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
                <Circuit store={store} nodeWindowResolver={nodeWindowResolver} />
                {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
            </StoreContext.Provider>
            <div className="fixed left-1/2 bottom-20 -translate-x-1/2 flex flex-row justify-center">
                <MenuButton onClick={() => setMenuOpen(true)} />
            </div>
        </main>
    );
}
