'use client';

import { useMemo } from 'react';
import { Circuit as CircuitComponent, CircuitStore, StoreContext } from '../../../circuit';
import { nodeWindowResolver } from '../../../windows';
import { Circuit } from '@bitspace/circuit';
import { Timer } from '../../../nodes/utilities/Timer/Timer';
import { ToHSV } from '../../../nodes/color/ToHSV/ToHSV';
import { ComplementaryHarmony } from '../../../nodes/color/ComplementaryHarmony/ComplementaryHarmony';
import { HSV } from '../../../nodes/color/HSV/HSV';
import { Multiplication } from '../../../nodes/math/Multiplication/Multiplication';
import { SignUp } from '../../../components/Onboarding/SignUp';

export default function Page(): JSX.Element {
    const circuitStore = useMemo(() => {
        const circuit = new Circuit();

        const timer = new Timer();
        const multiplication = new Multiplication();
        multiplication.inputs.b.next(0.1);
        const toHSV = new ToHSV();
        const cHarmonyNode = new ComplementaryHarmony();
        const hsvNode = new HSV();
        const hsvNode2 = new HSV();

        timer.outputs.time.connect(multiplication.inputs.a);
        multiplication.outputs.output.connect(toHSV.inputs.hue);
        toHSV.outputs.color.connect(cHarmonyNode.inputs.color);
        cHarmonyNode.outputs.a.connect(hsvNode.inputs.color);
        cHarmonyNode.outputs.b.connect(hsvNode2.inputs.color);

        const circuitStore = new CircuitStore(circuit);

        circuitStore.setNodes([
            [timer, { x: -1000, y: 200 }],
            [multiplication, { x: -600, y: 200 }],
            [toHSV, { x: -200, y: 150 }],
            [cHarmonyNode, { x: 200, y: 200 }],
            [hsvNode, { x: 600, y: 400 }],
            [hsvNode2, { x: 600, y: -50 }]
        ]);

        return circuitStore;
    }, []);

    return (
        <main className="flex flex-col justify-between h-screen w-screen cursor-[url('/cursor.svg')_4_4,auto]">
            <StoreContext.Provider value={{ store: circuitStore }}>
                <CircuitComponent store={circuitStore} nodeWindowResolver={nodeWindowResolver} />
            </StoreContext.Provider>
            <SignUp />
        </main>
    );
}
