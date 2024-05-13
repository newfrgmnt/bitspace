'use client';

import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import posthog from 'posthog-js';
import { useEffect } from 'react';

export function ClientLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    const session = useSession();

    useEffect(() => {
        posthog.identify(session.data?.user?.email ?? '');
    }, []);

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
