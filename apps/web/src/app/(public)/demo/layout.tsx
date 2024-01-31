'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <motion.main
            className="relative flex flex-col justify-between h-screen p-12"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.05 }}
        >
            <motion.div
                className="flex flex-row justify-center items-center w-full sticky top-0 z-10"
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { duration: 1, delay: 1 } }
                }}
            >
                <Link href="/">
                    <h3 className="text-2xl">Bitspace</h3>
                </Link>
            </motion.div>
            {children}
        </motion.main>
    );
}
