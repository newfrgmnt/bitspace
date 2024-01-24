'use client';

import { useMemo, useState } from 'react';
import { AnalogousHarmony } from '../../../nodes/AnalogousHarmony/AnalogousHarmony';
import { HSV } from '../../../nodes/HSV/HSV';
import { Circuit, CircuitStore, StoreContext } from '../../../circuit';
import { MenuButton } from '../../../components/Menu/MenuButton/MenuButton';
import { Menu } from '../../../components/Menu/Menu/Menu';
import { nodeWindowResolver } from '../../../windows';
import { useHotkeys } from 'react-hotkeys-hook';
import { Timer } from '../../../nodes/Timer/Timer';
import { ToHSV } from '../../../nodes/ToHSV/ToHSV';
import { ComplementaryHarmony } from '../../../nodes/ComplementaryHarmony/ComplementaryHarmony';
import { Journey } from '../../../components/Onboarding/Journey';

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
        const timer = new Timer();
        const toHSV = new ToHSV();
        const cHarmonyNode = new ComplementaryHarmony();
        const hsvNode = new HSV();
        const hsvNode2 = new HSV();

        timer.outputs.time.connect(toHSV.inputs.hue);
        toHSV.outputs.color.connect(cHarmonyNode.inputs.color);
        cHarmonyNode.outputs.a.connect(hsvNode.inputs.color);
        cHarmonyNode.outputs.b.connect(hsvNode2.inputs.color);

        circuitStore.setNodes([
            [timer, { x: -600, y: 200 }],
            [toHSV, { x: -200, y: 150 }],
            [cHarmonyNode, { x: 200, y: 200 }],
            [hsvNode, { x: 600, y: 400 }],
            [hsvNode2, { x: 600, y: -50 }]
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
            <Journey
                steps={[
                    {
                        title: 'Welcome to Bitspace',
                        description: 'A visual programming environment for creative endeavours.'
                    },
                    {
                        title: 'Circuits',
                        description:
                            'This canvas is known as a Circuit. It contains nodes & connections - the building blocks of Bitspace.'
                    }
                ]}
            />
        </main>
    );
}
