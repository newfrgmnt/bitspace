'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FocusEventHandler, useCallback } from 'react';
import { ExtendedNode } from '@/circuit/utils/circuit/buildCircuit';
import { Avatar } from '@/circuit/components/Avatar/Avatar';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { updateCircuit } from '@/server/mutations/updateCircuit';

export const CircuitHeader = ({ circuit }: { circuit: ExtendedNode }) => {
    return (
        <motion.div
            className="flex flex-row justify-between items-center w-full z-10 px-12 pt-12"
            variants={{
                initial: { opacity: 0 },
                animate: {
                    opacity: 1,
                    transition: { duration: 1, delay: 1 }
                }
            }}
        >
            <Link href="/dashboard">
                <h3 className="text-2xl">Bitspace</h3>
            </Link>
            <CircuitModule circuit={circuit} />
            <Avatar />
        </motion.div>
    );
};

const CircuitModule = ({ circuit }: { circuit: ExtendedNode }) => {
    const updateCircuitName: FocusEventHandler<HTMLHeadingElement> =
        useCallback(
            e => {
                if (e.target.innerText.length !== 0) {
                    updateCircuit(circuit.id, { name: e.target.innerText });
                }
            },
            [circuit, updateCircuit]
        );

    return (
        <div className="flex flex-row items-center gap-x-3 focus-within:bg-white focus-within:shadow-2xl hover:bg-white hover:shadow-2xl transition-all pr-3 pl-6 py-2 rounded-full">
            <h3
                className="bg-transparent border-none p-0 w-fit cursor-text focus-within:outline-none text-lg"
                spellCheck="false"
                onBlur={updateCircuitName}
                contentEditable
                suppressContentEditableWarning
                onKeyDown={e => {
                    e.stopPropagation();

                    if (e.key === 'Enter') {
                        e.preventDefault();
                        e.currentTarget.blur();
                    }
                }}
            >
                {circuit.name}
            </h3>
            <div className="flex flex-col items-center justify-center h-6 w-6 hover:bg-gray-200 rounded-full transition-colors">
                <KeyboardArrowDownOutlined fontSize="inherit" />
            </div>
        </div>
    );
};
