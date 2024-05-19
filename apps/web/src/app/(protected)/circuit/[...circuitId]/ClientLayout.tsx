'use client';

import { motion } from 'framer-motion';

export function ClientLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <motion.main
            className="relative flex flex-col justify-between h-screen p-4"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.05 }}
        >
            {children}
        </motion.main>
    );
}
