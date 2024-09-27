'use client';

import { useMemo } from 'react';
import { Circuit } from '@bitspace/circuit';
import { Timer, Oscillator } from '@bitspace/nodes/utilities';
import {
    AnalogousHarmony,
    Gradient,
    SquareHarmony,
    ToColor
} from '@bitspace/nodes/color';
import { Multiplication } from '@bitspace/nodes/math';
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
        const osc = new Oscillator();
        osc.inputs.amplitude.next(180);
        osc.inputs.frequency.next(0.4);
        timer.outputs.seconds.connect(osc.inputs.time);
        const toColor = new ToColor();
        osc.outputs.output.connect(toColor.inputs.hue);
        const sHarmonyNode = new SquareHarmony();
        toColor.outputs.color.connect(sHarmonyNode.inputs.color);
        const analogousNode = new AnalogousHarmony();
        sHarmonyNode.outputs.c.connect(analogousNode.inputs.color);
        const gradientNode = new Gradient();
        analogousNode.outputs.a.connect(gradientNode.inputs.a);
        analogousNode.outputs.c.connect(gradientNode.inputs.b);

        timer.setPosition(-1400, 100);
        osc.setPosition(-1000, 100);
        toColor.setPosition(-600, 0);
        sHarmonyNode.setPosition(-200, 200);
        analogousNode.setPosition(200, 200);
        gradientNode.setPosition(600, 200);

        circuit.addNode(timer);
        circuit.addNode(osc);
        circuit.addNode(toColor);
        circuit.addNode(sHarmonyNode);
        circuit.addNode(analogousNode);
        circuit.addNode(gradientNode);

        const circuitStore = new CanvasStore(circuit);

        return circuitStore;
    }, []);

    return (
        <StoreContext.Provider value={{ store: circuitStore }}>
            <div className="relative flex flex-col justify-between h-screen md:h-auto md:aspect-video w-full cursor-[url('/cursor.svg')_4_4,auto] rounded-[2rem] overflow-hidden">
                <CircuitComponent
                    className="overflow-x-auto overflow-y-hidden"
                    store={circuitStore}
                    nodeWindowResolver={nodeWindowResolver}
                />
            </div>
        </StoreContext.Provider>
    );
};
