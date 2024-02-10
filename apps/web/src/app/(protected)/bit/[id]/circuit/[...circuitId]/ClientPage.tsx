'use client';

import { useCallback, useMemo, useState } from 'react';
import { Circuit as CircuitComponent, CircuitStore, StoreContext } from '../../../../../../circuit';
import { MenuButton } from '../../../../../../components/Menu/MenuButton/MenuButton';
import { Menu } from '../../../../../../components/Menu/Menu/Menu';
import { nodeWindowResolver } from '../../../../../../windows';
import { useHotkeys } from 'react-hotkeys-hook';
import { Journey } from '../../../../../../components/Onboarding/Journey';
import { PropertyPanel } from '../../../../../../containers/PropertyPanel/PropertyPanel';
import posthog from 'posthog-js';
import {
    Input as SerializedInput,
    Output as SerializedOutput,
    Node as SerializedNode,
    NodePosition as SerializedPosition,
    Connection as SerializedConnection
} from '@prisma/client';
import { Circuit, Input, Output } from '@bitspace/circuit';
import { NodeConstructor, NodeConstructors } from '../../../../../../nodes';
import { Minimap } from '../../../../../../components/Minimap/Minimap';
import { removeConnection } from '../../../../../../server/mutations/removeConnection';

interface ExtendedNode extends SerializedNode {
    children: ExtendedNode[];
    position: SerializedPosition;
    inputs: SerializedInput[];
    outputs: (SerializedOutput & {
        connections: SerializedConnection[];
    })[];
}

export const ClientPage = ({ circuit }: { circuit: ExtendedNode }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    useHotkeys(
        'space',
        e => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen(true);

            posthog.capture('Menu invoked from hotkey');
        },
        {
            enabled: !menuOpen
        }
    );

    const onMenuButtonClick = useCallback(() => {
        setMenuOpen(true);

        posthog.capture('Menu invoked from button');
    }, [setMenuOpen]);

    const buildCircuit = useCallback((serializedNode: ExtendedNode) => {
        if (serializedNode.type !== 'CIRCUIT') {
            return;
        }

        const connectionCache = new Set<[Output['id'], Input<any>['id']]>();
        const portCache = new Map<Input['id'] | Output['id'], Input<any> | Output<any>>();

        const circuit = new Circuit();
        circuit.id = serializedNode.id;

        for (const child of serializedNode.children) {
            const nodeConstructor = NodeConstructors.find(
                (nodeConstructor: NodeConstructor) => nodeConstructor.type === child.type
            );

            if (!nodeConstructor) continue;

            const node = new nodeConstructor();

            node.id = child.id;
            node.position = { x: child.position.x, y: child.position.y };

            for (const serializedOutput of Object.values(child.outputs)) {
                const output = node.outputs[serializedOutput.key];

                if (output) {
                    output.id = serializedOutput.id;

                    portCache.set(output.id, output);

                    for (const serializedConnection of serializedOutput.connections) {
                        connectionCache.add([serializedConnection.fromId, serializedConnection.toId]);
                    }
                }
            }

            for (const serializedInput of Object.values(child.inputs)) {
                const input: Input = node.inputs[serializedInput.key];

                if (input) {
                    input.id = serializedInput.id;

                    portCache.set(input.id, input);

                    if (serializedInput.value) {
                        input.next(input.type.validator.parse(serializedInput.value));
                    }
                }
            }

            circuit.addNode(node);
        }

        for (const [outputId, inputId] of connectionCache) {
            const output = portCache.get(outputId) as Output<any>;
            const input = portCache.get(inputId) as Input<any>;

            output.connect(input, removeConnection);
        }

        return circuit;
    }, []);

    const circuitStore = useMemo(() => {
        if (!circuit) return;

        const c = buildCircuit(circuit);

        if (!c) {
            return;
        }

        const store = new CircuitStore(c);

        return store;
    }, [circuit, buildCircuit]);

    if (!circuitStore) return <></>;

    return (
        <main className="flex flex-col justify-between h-screen w-screen cursor-[url('/cursor.svg')_4_4,auto]">
            <StoreContext.Provider value={{ store: circuitStore }}>
                <CircuitComponent store={circuitStore} nodeWindowResolver={nodeWindowResolver} />
                {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
                <PropertyPanel className="fixed right-12 top-32" />
                {/* <Minimap className="fixed right-12 bottom-20" /> */}
            </StoreContext.Provider>
            <div className="fixed left-1/2 bottom-20 -translate-x-1/2 flex flex-row justify-center">
                {<MenuButton onClick={onMenuButtonClick} animate={menuOpen} />}
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
};
