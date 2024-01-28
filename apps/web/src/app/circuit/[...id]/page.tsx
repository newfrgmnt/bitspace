'use client';

import { Circuit } from '@bitspace/circuit';
import ClientPage from './ClientPage';
import { Timer } from '../../../nodes/utilities/Timer/Timer';
import { ToHSV } from '../../../nodes/color/ToHSV/ToHSV';
import { ComplementaryHarmony } from '../../../nodes/color/ComplementaryHarmony/ComplementaryHarmony';
import { HSV } from '../../../nodes/color/HSV/HSV';
import { CircuitStore } from '../../../circuit';
import { useParams } from 'next/navigation';

const buildCircuitStores = () => {
    const circuitA = new Circuit();

    const output = circuitA.nodes[0];

    const timer = new Timer();
    const toHSV = new ToHSV();
    const cHarmonyNode = new ComplementaryHarmony();
    const hsvNode = new HSV();
    const hsvNode2 = new HSV();

    timer.outputs.time.connect(toHSV.inputs.hue);
    toHSV.outputs.color.connect(cHarmonyNode.inputs.color);
    cHarmonyNode.outputs.a.connect(hsvNode.inputs.color);
    cHarmonyNode.outputs.b.connect(hsvNode2.inputs.color);

    // @ts-ignore
    hsvNode.outputs.hue.connect(output?.inputs?.output);

    const circuitStore = new CircuitStore(circuitA);

    circuitStore.setNodePosition(output?.id ?? '', { x: 1200, y: 0 });

    circuitStore.setNodes([
        [timer, { x: -600, y: 200 }],
        [toHSV, { x: -200, y: 150 }],
        [cHarmonyNode, { x: 200, y: 200 }],
        [hsvNode, { x: 600, y: 400 }],
        [hsvNode2, { x: 600, y: -50 }]
    ]);

    const c = new Circuit();
    const cs = new CircuitStore(c);

    c.addNode(circuitA);

    return new Map<string, CircuitStore>([
        [c.id, cs],
        [circuitA.id, circuitStore]
    ]);
};

const circuitStores = buildCircuitStores();

export default function Page() {
    const { id: circuitId } = useParams();
    const id = circuitId && circuitId[circuitId?.length - 1];

    const circuitStore = circuitStores.get(id as string) ?? [...circuitStores.values()][0];

    if (!circuitStore) {
        return <h1>No Circuit Store found</h1>;
    }

    return <ClientPage circuitStore={circuitStore} />;
}
