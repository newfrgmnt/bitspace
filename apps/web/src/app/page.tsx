'use client';

import { motion } from 'framer-motion';
import { AddOutlined, HiveOutlined } from '@mui/icons-material';

const cards = [
    {
        icon: <AddOutlined fontSize="large" />,
        title: 'New Project'
    },
    {
        icon: <HiveOutlined fontSize="large" />,
        title: 'Alma'
    },
    {
        icon: <HiveOutlined fontSize="large" />,
        title: 'Nodl'
    }
];

export default function Page(): JSX.Element {
    return (
        <>
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
                {cards.map(card => (
                    <motion.a
                        key={card.title}
                        href="/circuit"
                        className="flex flex-col gap-y-8 rounded-3xl p-8 text-lg bg-slate-200 w-48 h-56 hover:bg-white group transition-colors duration-200 items-stretch justify-between"
                        variants={{
                            initial: { y: 200, opacity: 0 },
                            animate: { y: 0, opacity: 1, transition: { duration: 1.6, ease: [0.75, 0, 0.25, 1] } }
                        }}
                    >
                        <span className="group-hover:text-blue-500 transition-colors">{card.icon}</span>
                        <h3 className="font-medium text-2xl leading-normal">{card.title}</h3>
                    </motion.a>
                ))}
            </div>
        </>
    );
}
