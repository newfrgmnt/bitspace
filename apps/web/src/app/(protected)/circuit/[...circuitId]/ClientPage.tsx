'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useCallback, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { CanvasStore, Circuit as CircuitComponent, StoreContext } from '../../../../circuit';
import { ExtendedNode, buildCircuit } from '../../../../circuit/utils/circuit/buildCircuit';
import { MenuButton } from '../../../../components/Menu/MenuButton/MenuButton';
import { Minimap } from '../../../../components/Minimap/Minimap';
import { Journey } from '../../../../components/Onboarding/Journey';
import { PropertyPanel } from '../../../../containers/PropertyPanel/PropertyPanel';
import { nodeWindowResolver } from '../../../../windows';
import { Menu } from '../../../../components/Menu/Menu/Menu';

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

    const canvasStore = useMemo(() => {
        if (!circuit) return;

        const c = buildCircuit(circuit);

        if (!c) {
            return;
        }

        const store = new CanvasStore(c);

        return store;
    }, [circuit, buildCircuit]);

    if (!canvasStore) return <></>;

    return (
        <main className="flex flex-row items-stretch h-full w-full gap-x-8">
            <StoreContext.Provider value={{ store: canvasStore }}>
                <div className="relative flex flex-col justify-between h-full w-full cursor-[url('/cursor.svg')_4_4,auto] rounded-tr-[2rem] overflow-hidden">
                    <motion.div
                        className="flex flex-row justify-center items-center w-full absolute h-24 top-0 left-0 right-0 z-10"
                        variants={{
                            initial: { opacity: 0 },
                            animate: { opacity: 1, transition: { duration: 1, delay: 1 } }
                        }}
                    >
                        <Link href="/">
                            <h3 className="text-xl">Bitspace</h3>
                        </Link>
                    </motion.div>
                    <CircuitComponent store={canvasStore} nodeWindowResolver={nodeWindowResolver} />
                    { menuOpen && <Menu onClose={() => setMenuOpen(false)} /> }
                    <div className="absolute left-1/2 bottom-12 -translate-x-1/2 flex flex-row justify-center">
                        {<MenuButton onClick={onMenuButtonClick} animate={menuOpen} />}
                    </div>
                    <Journey
                        persistenceKey="onboarding-complete"
                        steps={[
                            {
                                title: 'Welcome to Bitspace',
                                description: `A visual programming environment for creative endeavours. Let's go through the basics.`
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
                                description:
                                    'These are used to link data between different nodes. Connections may only be established between outputs & inputs'
                            }
                        ]}
                    />
                </div>
                <PropertyPanel />
            </StoreContext.Provider>
        </main>
    );
};
