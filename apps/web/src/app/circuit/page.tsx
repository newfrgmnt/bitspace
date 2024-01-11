'use client';

import { motion } from 'framer-motion';
import Draggable from 'react-draggable';
import { ColorWheel, combinations } from '../../components/Color/ColorWheel';

export default function Page(): JSX.Element {
    return (
        <motion.main className="flex flex-col justify-between h-screen w-screen cursor-[url('/cursor.svg'),auto]">
            <motion.div
                variants={{
                    initial: { opacity: 0 },
                    animate: {
                        opacity: 1,
                        transition: { duration: 1, delay: 1, ease: [0.75, 0, 0.25, 1], staggerChildren: 0.5 }
                    }
                }}
            >
                {Object.keys(combinations).map((combination, i) => (
                    <Draggable key={combination} defaultPosition={{ x: i * 330, y: 250 }} disabled>
                        <motion.div className="flex flex-col items-center gap-y-8 absolute">
                            <h3 className="capitalize font-medium">{combination}</h3>
                            <div className="relative">
                                <ColorWheel combination={combination as keyof typeof combinations} />
                            </div>
                        </motion.div>
                    </Draggable>
                ))}
            </motion.div>
        </motion.main>
    );
}
