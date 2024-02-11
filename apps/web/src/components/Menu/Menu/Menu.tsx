import React, { KeyboardEventHandler, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { motion } from 'framer-motion';
import { NodeGroups } from '../../../nodes';
import clsx from 'clsx';
import { StoreContext } from '../../../circuit';
import { useClickOutside } from '../../../circuit/hooks/useClickOutside/useClickOutside';
import { startCase } from 'lodash';
import posthog from 'posthog-js';
import { createNode } from '../../../server/mutations/createNode';

export interface MenuProps {
    onClose: () => void;
}

export const Menu = ({ onClose }: MenuProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const { store } = useContext(StoreContext);
    useClickOutside(modalRef, onClose);

    const matchingGroups = useMemo(() => {
        return NodeGroups.map(group => {
            return {
                name: group.name,
                nodes: group.nodes.filter(node => {
                    return node.displayName.toLowerCase().includes(query.toLowerCase());
                })
            };
        }).filter(group => group.nodes.length);
    }, [query]);

    const matchingItems = useMemo(() => matchingGroups.flatMap(group => group.nodes), [matchingGroups]);

    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    const handlePress = useCallback(async () => {
        const matchingNode = matchingGroups.flatMap(group => group.nodes)[activeIndex];

        if (matchingNode) {
            const node = new matchingNode();
            store.circuit.addNode(node);
            store.selectNodes([node]);

            await createNode({
                id: node.id,
                name: matchingNode.displayName,
                type: matchingNode.type,
                parentId: store.circuit.id,
                position: {
                    create: {
                        x: node.position.x,
                        y: node.position.y
                    }
                },
                inputs: {
                    createMany: {
                        data: Object.entries(node.inputs).map(([key, input]) => ({
                            id: input.id,
                            key,
                            value: typeof input.value !== 'function' ? input.value : undefined
                        }))
                    }
                },
                outputs: {
                    createMany: {
                        data: Object.entries(node.outputs).map(([key, output]) => ({ id: output.id, key }))
                    }
                }
            });

            /** @ts-ignore */
            posthog.capture('Node Created from Menu', { node: matchingNode.constructor.type });

            onClose();
        }
    }, [matchingGroups, onClose, store, activeIndex]);

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
        e => {
            e.stopPropagation();

            if (e.key === 'ArrowDown') {
                setActiveIndex(activeIndex => Math.max(0, Math.min(matchingItems.length - 1, activeIndex + 1)));
            } else if (e.key === 'ArrowUp') {
                setActiveIndex(activeIndex => Math.min(matchingItems.length - 1, Math.max(0, activeIndex - 1)));
            }

            if (e.key === 'Enter') {
                handlePress();
            }

            if (e.key === 'Escape') {
                onClose();
            }
        },
        [matchingGroups, activeIndex, onClose, store, setActiveIndex]
    );

    return (
        <motion.div
            className="fixed inset-0 bg-black/20 flex flex-col items-center z-90"
            variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { ease: [0.65, 0, 0.35, 1], duration: 0.2 } }
            }}
        >
            <motion.div
                ref={modalRef}
                className="bg-white rounded-3xl max-w-3xl w-full h-fit -translate-y-1/3 -translate-x-1/2 absolute top-1/3 left-1/2 overflow-hidden"
            >
                <FocusTrap>
                    <div className="flex flex-row p-8 border-b">
                        <input
                            tabIndex={0}
                            placeholder="Search for Nodes & Utilities..."
                            className="text-2xl w-full border-none focus:outline-none"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            autoFocus
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </FocusTrap>
                <div className="flex flex-col py-8 max-h-96 h-96 overflow-y-scroll gap-y-4">
                    {matchingGroups.map((group, index) => (
                        <MenuItemGroup key={group.name} title={group.name}>
                            {group.nodes.map(node => {
                                const index = matchingItems.indexOf(node);

                                return (
                                    <MenuItem
                                        key={node.displayName}
                                        title={node.displayName}
                                        active={activeIndex === index}
                                        index={index}
                                    />
                                );
                            })}
                        </MenuItemGroup>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

interface MenuItemProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    active: boolean;
    index: number;
}

const MenuItem = ({ title, description, active, index }: MenuItemProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const handleSelect = React.useCallback(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, []);

    useEffect(() => {
        if (active) {
            handleSelect();
        }
    }, [active]);

    return (
        <motion.div
            ref={ref}
            className={clsx('flex flex-col px-4 py-2 gap-y-1 transition-colors rounded-xl scroll-m-4', {
                'bg-slate-100': active,
                'scroll-m-24': index === 0
            })}
        >
            <h4 className="text-lg">{startCase(title)}</h4>
            {description && <p className="text-slate-400">{description}</p>}
        </motion.div>
    );
};

const MenuItemGroup = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div className="flex flex-col gap-y-2">
            <h3 className="px-8 text-slate-400">{title}</h3>
            <div className="flex flex-col px-4 gap-y-1">{children}</div>
        </div>
    );
};
