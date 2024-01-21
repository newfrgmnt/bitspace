'use client';

import { useMemo, useState } from 'react';
import { AnalogousHarmony } from '../../nodes/AnalogousHarmony/AnalogousHarmony';
import { HSV } from '../../nodes/HSV/HSV';
import { Circuit, CircuitStore, StoreContext } from '../../circuit';
import { MenuButton } from '../../components/Menu/MenuButton/MenuButton';
import { Menu } from '../../components/Menu/Menu/Menu';
import { nodeWindowResolver } from '../windows';
import { useHotkeys } from 'react-hotkeys-hook';

export default function Page(): JSX.Element {
    const [menuOpen, setMenuOpen] = useState(false);
    useHotkeys(
        'space',
        e => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen(true);
        },
        {
            enabled: !menuOpen
        }
    );

    const store = useMemo(() => {
        const circuitStore = new CircuitStore();
        const analogousHarmonyNode = new AnalogousHarmony();
        const hsvNode = new HSV();

        analogousHarmonyNode.outputs.a.connect(hsvNode.inputs.color);

        circuitStore.setNodes([
            [analogousHarmonyNode, { x: -300, y: 200 }],
            [hsvNode, { x: 300, y: 200 }]
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
                {<MenuButton onClick={() => setMenuOpen(true)} animate={menuOpen} />}
            </div>
        </main>
    );
}
