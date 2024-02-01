import { motion } from 'framer-motion';
import { Panel } from '../Panel/Panel';
import Link from 'next/link';
import PolarIcon from '../Icons/PolarIcon';
import { useState } from 'react';
import { CloseOutlined } from '@mui/icons-material';

export const SignUp = () => {
    const [isShown, toggle] = useState(true);

    if (!isShown) return null;

    return (
        <Panel
            className="right-4 bottom-4 left-4 md:right-[unset] md:left-12 md:bottom-12 fixed md:w-80 justify-between z-20"
            variants={{
                initial: { y: 300, opacity: 0 },
                animate: { y: 0, opacity: 1, transition: { duration: 1.6, ease: [0.75, 0, 0.25, 1] } }
            }}
        >
            <motion.div
                className="h-full w-full flex flex-col"
                variants={{
                    initial: { y: 40, opacity: 0 },
                    animate: { y: 0, opacity: 1, transition: { duration: 2, ease: [0.75, 0, 0.25, 1] } }
                }}
            >
                <motion.div
                    className="flex flex-col flex-grow gap-y-12 relative"
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { duration: 1, ease: 'linear' } }
                    }}
                >
                    <div className="absolute -top-4 -right-4 text-gray-500" is="button">
                        <CloseOutlined onClick={() => toggle(false)} fontSize="small" />
                    </div>
                    <div className="flex flex-col gap-y-6 flex-grow">
                        <motion.h3 className="text-2xl font-medium leading-snug">Welcome to Bitspace</motion.h3>
                        <div className="flex flex-col gap-y-4">
                            <motion.p className="text-slate-500 leading-relaxed">
                                A visual programming environment for creative endeavours.
                            </motion.p>
                            <motion.p className="text-slate-500 leading-relaxed">
                                Join the upcoming private alpha & get all the latest updates by subscribing to the
                                Supporter-tier on Polar.
                            </motion.p>
                        </div>
                    </div>
                    <Link
                        className="flex flex-row gap-x-2 rounded-full pl-3 pr-6 py-2 items-center bg-blue-700 hover:bg-blue-500 transition-colors self-start text-blue-50"
                        target="_blank"
                        href="https://polar.sh/emilwidlund/subscriptions"
                    >
                        <PolarIcon size={24} className="text-white" />
                        <span className="text-sm">Subscribe on Polar</span>
                    </Link>
                </motion.div>
            </motion.div>
        </Panel>
    );
};
