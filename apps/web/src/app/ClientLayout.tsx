'use client';

import './globals.css';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function ClientLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <motion.main
            className="relative flex flex-col justify-between h-screen p-20"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.05 }}
        >
            <motion.div
                className="flex flex-row justify-between items-center w-full sticky top-0"
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { duration: 1, delay: 1 } }
                }}
            >
                <Image src="/bitspace_logo.png" alt="Bitspace" width={20} height={20} />
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
