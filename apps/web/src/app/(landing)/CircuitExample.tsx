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
import { Mesh } from '@/nodes/3d/Mesh/Mesh';
import { SquareHarmony } from '@/nodes/color/SquareHarmony/SquareHarmony';
import { Oscillator } from '@/nodes/utilities/Oscillator/Oscillator';

export const CircuitExample = () => {
    const circuitStore = useMemo(() => {
        const circuit = new Circuit();

        const timer = new Timer();
        const multiplication = new Multiplication();
        multiplication.inputs.b.next(0.1);
        const multiplication2 = new Multiplication();
        multiplication2.inputs.b.next(0.2);
        const osc = new Oscillator();
        osc.inputs.amplitude.next(1);
        const toHSV = new ToHSV();
        const sHarmonyNode = new SquareHarmony();
        const hsvNode = new FromHSV();
        const meshNode = new Mesh();

        timer.setPosition(-2000, 100);
        multiplication.setPosition(-1000, 100);
        multiplication2.setPosition(-1400, -50);
        osc.setPosition(-1000, -50);
        toHSV.setPosition(-450, 100);
        sHarmonyNode.setPosition(0, 200);
        hsvNode.setPosition(450, 420);
        meshNode.setPosition(450, -20);

        circuit.addNode(timer);
        circuit.addNode(multiplication);
        circuit.addNode(multiplication2);
        circuit.addNode(osc);
        circuit.addNode(toHSV);
        circuit.addNode(sHarmonyNode);
        circuit.addNode(hsvNode);
        circuit.addNode(meshNode);

        timer.outputs.milliseconds.connect(multiplication.inputs.a);
        multiplication.outputs.output.connect(toHSV.inputs.hue);
        timer.outputs.seconds.connect(multiplication2.inputs.a);
        multiplication2.outputs.output.connect(osc.inputs.time);
        osc.outputs.output.connect(toHSV.inputs.saturation);
        toHSV.outputs.color.connect(sHarmonyNode.inputs.color);
        sHarmonyNode.outputs.a.connect(hsvNode.inputs.color);
        sHarmonyNode.outputs.c.connect(meshNode.inputs.color);

        const circuitStore = new CanvasStore(circuit);

        return circuitStore;
    }, []);

    return (
        <StoreContext.Provider value={{ store: circuitStore }}>
            <div className="relative flex flex-col justify-between h-screen md:h-auto md:aspect-video w-full cursor-[url('/cursor.svg')_4_4,auto] rounded-[2rem] overflow-hidden">
                <CircuitComponent
                    store={circuitStore}
                    nodeWindowResolver={nodeWindowResolver}
                />
            </div>
        </StoreContext.Provider>
    );
};
