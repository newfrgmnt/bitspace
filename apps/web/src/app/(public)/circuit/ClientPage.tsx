'use client';

import { useMemo, useState } from 'react';
import { Circuit, CircuitStore, StoreContext } from '../../../circuit';
import { MenuButton } from '../../../components/Menu/MenuButton/MenuButton';
import { Menu } from '../../../components/Menu/Menu/Menu';
import { nodeWindowResolver } from '../../../windows';
import { useHotkeys } from 'react-hotkeys-hook';
import { Timer } from '../../../nodes/utilities/Timer/Timer';
import { Journey } from '../../../components/Onboarding/Journey';
import { ToHSV } from '../../../nodes/color/ToHSV/ToHSV';
import { ComplementaryHarmony } from '../../../nodes/color/ComplementaryHarmony/ComplementaryHarmony';
import { HSV } from '../../../nodes/color/HSV/HSV';
import { PropertyPanel } from '../../../containers/PropertyPanel/PropertyPanel';
import { CubicBezier } from '../../../nodes/utilities/CubicBezier/CubicBezier';

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
        const bezier = new CubicBezier();

        timer.outputs.time.connect(toHSV.inputs.hue);
        toHSV.outputs.color.connect(cHarmonyNode.inputs.color);
        cHarmonyNode.outputs.a.connect(hsvNode.inputs.color);
        cHarmonyNode.outputs.b.connect(hsvNode2.inputs.color);

        circuitStore.setNodes([
            [timer, { x: -600, y: 200 }],
            [toHSV, { x: -200, y: 150 }],
            [cHarmonyNode, { x: 200, y: 200 }],
            [hsvNode, { x: 600, y: 400 }],
            [hsvNode2, { x: 600, y: -50 }],
            [bezier, { x: 900, y: 0 }]
        ]);

        return circuitStore;
    }, []);

    return (
        <main className="flex flex-col justify-between h-screen w-screen cursor-[url('/cursor.svg')_4_4,auto]">
            <StoreContext.Provider value={{ store }}>
                <Circuit store={store} nodeWindowResolver={nodeWindowResolver} />
                {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
                <PropertyPanel className="fixed right-20 top-20" />
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
                    },
                    {
                        title: 'Nodes',
                        description: 'Isolated blocks of computation, operating on inputs to produce outputs.'
                    },
                    {
                        title: 'Connections',
                        description: 'These are used to link data between different nodes.'
                    }
                ]}
            />
        </main>
    );
}
