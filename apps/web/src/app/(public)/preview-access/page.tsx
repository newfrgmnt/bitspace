'use client';

import { motion } from 'framer-motion';
import PolarIcon from '../../../components/Icons/PolarIcon';
import Link from 'next/link';

const cards = [
    {
        icon: <PolarIcon size={56} className="text-blue-500" />,
        title: 'Subscribe on Polar',
        link: 'https://polar.sh/emilwidlund/subscriptions'
    }
];

export default function Page(): JSX.Element {
    return (
        <>
            <div className="flex flex-col gap-y-8 justify-center h-full">
                <motion.div className="overflow-hidden">
                    <motion.h1
                        className="text-6xl leading-tight"
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
                        Bitspace Preview Access
                    </motion.h1>
                </motion.div>
                <motion.div className="overflow-hidden">
                    <motion.p
                        className="text-2xl text-slate-500 text-wrap-[balance] leading-normal"
                        variants={{
                            initial: {
                                y: '100%'
                            },
                            animate: {
                                y: '0%',
                                transition: {
                                    duration: 1.5,
                                    delay: 0.5,
                                    ease: [0.75, 0, 0.25, 1]
                                }
                            }
                        }}
                    >
                        Subscribe to get preview access, an invite to the Discord-channel & the latest updates
                    </motion.p>
                </motion.div>
                <motion.div
                    className="flex flex-row items-center gap-x-8 mt-4"
                    variants={{
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1,
                            transition: {
                                duration: 1.5,
                                delay: 1.2,
                                ease: [0.75, 0, 0.25, 1]
                            }
                        }
                    }}
                >
                    <Link
                        className="flex flex-row gap-x-2 rounded-full pl-3 pr-6 py-2 items-center bg-blue-500 hover:bg-blue-400 transition-colors self-start text-white"
                        target="_blank"
                        href="https://polar.sh/emilwidlund/subscriptions"
                    >
                        <PolarIcon size={32} className="text-white" />
                        <span>Subscribe on Polar</span>
                    </Link>
                    <span className="text-xl leading-tight text-blue-500">$5 /month</span>
                </motion.div>
            </div>
        </>
    );
}
