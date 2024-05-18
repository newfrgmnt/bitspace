'use client';

import { useMemo } from 'react';
import { Circuit } from '@bitspace/circuit';
import { Timer } from '../../nodes/utilities/Timer/Timer';
import { ToHSV } from '../../nodes/color/ToHSV/ToHSV';
import { ComplementaryHarmony } from '../../nodes/color/ComplementaryHarmony/ComplementaryHarmony';
import { FromHSV } from '../../nodes/color/FromHSV/FromHSV';
import { Multiplication } from '../../nodes/math/Multiplication/Multiplication';
import {
    StoreContext,
    Circuit as CircuitComponent,
    CanvasStore
} from '../../circuit';
import { nodeWindowResolver } from '../../windows';

export const CircuitExample = () => {
    const circuitStore = useMemo(() => {
        const circuit = new Circuit();

        const timer = new Timer();
        const multiplication = new Multiplication();
        multiplication.inputs.b.next(0.1);
        const toHSV = new ToHSV();
        const cHarmonyNode = new ComplementaryHarmony();
        const hsvNode = new FromHSV();
        const hsvNode2 = new FromHSV();

        timer.setPosition(-1300, 100);
        multiplication.setPosition(-1000, 100);
        toHSV.setPosition(-600, 100);
        cHarmonyNode.setPosition(-200, 50);
        hsvNode.setPosition(200, 300);
        hsvNode2.setPosition(550, 150);

        circuit.addNode(timer);
        circuit.addNode(multiplication);
        circuit.addNode(toHSV);
        circuit.addNode(cHarmonyNode);
        circuit.addNode(hsvNode);
        circuit.addNode(hsvNode2);

        timer.outputs.milliseconds.connect(multiplication.inputs.a);
        multiplication.outputs.output.connect(toHSV.inputs.hue);
        toHSV.outputs.color.connect(cHarmonyNode.inputs.color);
        cHarmonyNode.outputs.a.connect(hsvNode.inputs.color);
        cHarmonyNode.outputs.b.connect(hsvNode2.inputs.color);

        const circuitStore = new CanvasStore(circuit);

        return circuitStore;
    }, []);

    return (
        <StoreContext.Provider value={{ store: circuitStore }}>
            <div className="relative flex flex-col justify-between h-screen md:h-auto md:aspect-video w-full cursor-[url('/cursor.svg')_4_4,auto] rounded-[2rem] overflow-hidden pointer-events-none">
                <CircuitComponent
                    store={circuitStore}
                    nodeWindowResolver={nodeWindowResolver}
                />
            </div>
        </StoreContext.Provider>
    );
};
