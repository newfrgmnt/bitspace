'use client';

import posthog from 'posthog-js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { moveNode } from '@/server/mutations/moveNode';
import { removeNode } from '@/server/mutations/removeNode';
import { removeConnection } from '@/server/mutations/removeConnection';
import {
    ExtendedNode,
    buildCircuit
} from '@/circuit/utils/circuit/buildCircuit';
import { CanvasStore, StoreContext } from '@/circuit';
import { CircuitHeader } from '@/circuit/containers/CircuitHeader/CircuitHeader';
import { Circuit as CircuitContainer } from '@/circuit/containers/Circuit/Circuit';
import { nodeWindowResolver } from '@/windows';
import { Menu } from '@/components/Menu/Menu/Menu';
import { MenuButton } from '@/components/Menu/MenuButton/MenuButton';
import { PropertyPanel } from '@/containers/PropertyPanel/PropertyPanel';
import { Onboarding } from './Onboarding';
import { Connection, Node } from '@bitspace/circuit';

export const ClientPage = ({ circuit }: { circuit: ExtendedNode }) => {
    const {
        canvasStore,
        menuOpen,
        setMenuOpen,
        onMenuButtonClick,
        onNodeRemoval,
        onConnectionRemoval,
        onNodeMoveStop
    } = useCircuitPage(circuit);

    if (!canvasStore) return <></>;

    return (
        <main className="flex flex-row items-stretch h-full w-full gap-x-8">
            <StoreContext.Provider value={{ store: canvasStore }}>
                <div className="relative flex flex-col justify-between h-full w-full cursor-[url('/cursor.svg')_4_4,auto] rounded-[2rem] overflow-hidden">
                    <CircuitHeader circuit={circuit} />
                    <CircuitContainer
                        store={canvasStore}
                        nodeWindowResolver={nodeWindowResolver}
                        onNodeRemoval={onNodeRemoval}
                        onConnectionRemoval={onConnectionRemoval}
                        onNodeMoveStop={onNodeMoveStop}
                    />
                    {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
                    <Onboarding />
                </div>
                <PropertyPanel />
            </StoreContext.Provider>
        </main>
    );
};

const useCircuitPage = (circuit: ExtendedNode) => {
    const [canvasStore, setCanvasStore] = useState<CanvasStore | undefined>(
        undefined
    );
    const [menuOpen, setMenuOpen] = useState(false);

    useHotkeys(
        ['space', 'meta+k', 'ctrl+k'],
        e => {
            e.preventDefault();
            e.stopPropagation();
            setMenuOpen(!menuOpen);

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

    const onNodeRemoval = useCallback((node: Node) => {
        removeNode(node.id);
    }, []);

    const onConnectionRemoval = useCallback(
        (connection: Connection<unknown>) => {
            removeConnection(connection.from.id, connection.to.id);
        },
        []
    );

    useEffect(() => {
        if (!circuit) return;

        const c = buildCircuit(circuit);
        const store = c ? new CanvasStore(c) : undefined;

        setCanvasStore(store);

        return () => {
            store?.dispose();
        };
    }, [circuit]);

    const onNodeMoveStop = useCallback(() => {
        for (const selectedNode of canvasStore?.selectedNodes ?? []) {
            moveNode(selectedNode.id, {
                x: selectedNode.position.x,
                y: selectedNode.position.y
            });
        }
    }, [canvasStore]);

    return {
        canvasStore,
        menuOpen,
        setMenuOpen,
        onMenuButtonClick,
        onNodeRemoval,
        onConnectionRemoval,
        onNodeMoveStop
    };
};
