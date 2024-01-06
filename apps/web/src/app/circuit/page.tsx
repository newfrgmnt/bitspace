'use client';

import { motion } from 'framer-motion';
import Draggable from 'react-draggable';

export default function Page(): JSX.Element {
    return (
        <motion.main className="flex flex-col justify-between h-screen w-screen cursor-[url('/cursor.svg'),auto]">
            <motion.div
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { duration: 1, delay: 1, ease: [0.75, 0, 0.25, 1] } }
                }}
            >
                <Draggable>
                    <motion.div className="w-72 h-72 rounded-[2.5rem] overflow-hidden bg-slate-200 border-4 border-transparent hover:border-slate-300 transition-colors"></motion.div>
                </Draggable>
            </motion.div>
        </motion.main>
    );
}
