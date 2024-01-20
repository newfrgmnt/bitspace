'use client';

import './globals.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function ClientLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <motion.main
            className="relative flex flex-col justify-between h-screen p-20"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.05 }}
        >
            <motion.div
                className="flex flex-row justify-between items-center w-full sticky top-0 z-10 pointer-events-none"
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { duration: 1, delay: 1 } }
                }}
            >
                <Link href="/">
                    <h3 className="text-2xl">Bitspace</h3>
                </Link>
                <div
                    className="w-10 h-10 bg-cover bg-center rounded-full"
                    style={{
                        backgroundImage: `url(https://pbs.twimg.com/profile_images/1699785592723349504/BU-JhnQC_400x400.jpg)`
                    }}
                />
            </motion.div>
            {children}
        </motion.main>
    );
}
