import React, { KeyboardEventHandler, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { motion } from 'framer-motion';
import { NodeGroups } from '../../../nodes';
import clsx from 'clsx';
import { StoreContext } from '../../../circuit';

export interface MenuProps {
    onClose: () => void;
}

export const Menu = ({ onClose }: MenuProps) => {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const { store } = useContext(StoreContext);

    const matchingGroups = useMemo(() => {
        return NodeGroups.map(group => {
            return {
                name: group.name,
                nodes: group.nodes.filter(node => {
                    return node.name.toLowerCase().includes(query.toLowerCase());
                })
            };
        }).filter(group => group.nodes.length);
    }, [query]);

    const matchingItems = useMemo(() => matchingGroups.flatMap(group => group.nodes), [matchingGroups]);

    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
        e => {
            e.stopPropagation();

            if (e.key === 'ArrowDown') {
                setActiveIndex(activeIndex => activeIndex + 1);
            } else if (e.key === 'ArrowUp') {
                setActiveIndex(activeIndex => activeIndex - 1);
            }

            if (e.key === 'Enter') {
                const matchingNode = matchingGroups.flatMap(group => group.nodes)[activeIndex];
                console.log(matchingNode, matchingGroups, activeIndex);

                if (matchingNode) {
                    const node = new matchingNode();
                    store.setNodes([[node, { x: 0, y: 0 }]]);
                    onClose();
                }
            }
        },
        [matchingGroups, activeIndex, onClose, store, setActiveIndex]
    );

    return (
        <motion.div
            className="fixed inset-0 bg-black/20 flex flex-col items-center z-90"
            variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { ease: [0.65, 0, 0.35, 1], duration: 0.5 } }
            }}
        >
            <FocusTrap>
                <motion.div className="bg-white rounded-3xl max-w-3xl w-full h-fit -translate-y-1/3 -translate-x-1/2 absolute top-1/3 left-1/2 overflow-hidden">
                    <div className="flex flex-row p-8 border-b">
                        <input
                            placeholder="Search for Nodes & Utilities..."
                            className="text-2xl w-full border-none focus:outline-none"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            autoFocus
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="flex flex-col py-8 max-h-96 h-96 overflow-y-scroll gap-y-4">
                        {matchingGroups.map((group, index) => (
                            <MenuItemGroup key={group.name} title={group.name}>
                                {group.nodes.map(node => {
                                    const index = matchingItems.indexOf(node);

                                    return (
                                        <MenuItem
                                            key={node.name}
                                            title={node.name}
                                            active={activeIndex === index}
                                            onSelect={() => {}}
                                        />
                                    );
                                })}
                            </MenuItemGroup>
                        ))}
                    </div>
                </motion.div>
            </FocusTrap>
        </motion.div>
    );
};

interface MenuItemProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    active: boolean;
    onSelect: () => void;
}

const MenuItem = ({ title, description, active }: MenuItemProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const handleSelect = React.useCallback(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, []);

    useEffect(() => {
        handleSelect();
    }, [active]);

    return (
        <div
            ref={ref}
            className={clsx('flex flex-col px-8 py-2 gap-y-1 hover:bg-slate-100 transition-colors', {
                'bg-slate-100': active
            })}
        >
            <h4 className="text-lg">{title}</h4>
            {description && <p className="text-slate-400">{description}</p>}
        </div>
    );
};

const MenuItemGroup = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div className="flex flex-col gap-y-2">
            <h3 className="px-8 text-slate-400">{title}</h3>
            <div className="flex flex-col">{children}</div>
        </div>
    );
};
