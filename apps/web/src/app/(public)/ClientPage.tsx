'use client';

import { motion } from 'framer-motion';
import { AddOutlined, HiveOutlined } from '@mui/icons-material';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Bit } from '@prisma/client';
import { createBit } from '../../server/mutations/createBit';

export default function Page({ bits }: { bits: Bit[] }): JSX.Element {
    const router = useRouter();

    const handleNewBit = useCallback(async () => {
        const bit = await createBit();

        if (bit) {
            router.push(`/bit/${bit.id}`);
        }
    }, [router]);

    return (
        <motion.div
            className="h-[50vh] w-full flex flex-col justify-between"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.05 }}
        >
            <motion.div className="overflow-hidden">
                <motion.h1
                    className="text-6xl leading-normal"
                    variants={{
                        initial: {
                            y: '100%'
                        },
                        animate: {
                            y: '0%',
                            transition: {
                                duration: 1.5,
                                delay: 0.2,
                                ease: [0.75, 0, 0.25, 1]
                            }
                        }
                    }}
                >
                    Welcome to your Bitspace
                </motion.h1>
            </motion.div>
            <div className="flex flex-row gap-x-6">
                <motion.div
                    onClick={handleNewBit}
                    className="flex flex-col gap-y-8 rounded-3xl p-8 text-lg bg-slate-200 w-48 h-56 hover:bg-white group transition-colors duration-200 items-stretch justify-between"
                    variants={{
                        initial: { y: 200, opacity: 0 },
                        animate: { y: 0, opacity: 1, transition: { duration: 1.6, ease: [0.75, 0, 0.25, 1] } }
                    }}
                >
                    <span className="group-hover:text-black transition-colors">
                        <AddOutlined fontSize="large" />
                    </span>
                    <h3 className="font-medium text-2xl leading-normal">New Project</h3>
                </motion.div>
                {bits.map(bit => (
                    <motion.a
                        key={bit.name}
                        href={`/bit/${bit.id}`}
                        className="flex flex-col gap-y-8 rounded-3xl p-8 text-lg bg-slate-200 w-48 h-56 hover:bg-white group transition-colors duration-200 items-stretch justify-between"
                        variants={{
                            initial: { y: 200, opacity: 0 },
                            animate: { y: 0, opacity: 1, transition: { duration: 1.6, ease: [0.75, 0, 0.25, 1] } }
                        }}
                    >
                        <span className="group-hover:text-black transition-colors">
                            <HiveOutlined fontSize="large" />
                        </span>
                        <h3 className="font-medium text-2xl leading-normal">{bit.name}</h3>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
}
