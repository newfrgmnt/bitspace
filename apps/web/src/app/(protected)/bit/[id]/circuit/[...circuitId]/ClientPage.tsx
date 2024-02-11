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
import { ExtendedNode, buildCircuit } from '../../../../../../circuit/utils/circuit/buildCircuit';

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
