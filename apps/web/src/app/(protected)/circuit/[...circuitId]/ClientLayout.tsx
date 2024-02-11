'use client';

import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { SignInWithGithub } from '../../../../components/Auth/SignInWithGithub';
import { useNestedCircuit } from '../../../../hooks/useNestedCircuit/useNestedCircuit';
import { ArrowBackOutlined } from '@mui/icons-material';
import posthog from 'posthog-js';
import { useEffect } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }): JSX.Element {
    const session = useSession();

    useEffect(() => {
        posthog.identify(session.data?.user?.email ?? '');
    }, []);

    return (
        <motion.main
            className="relative flex flex-col justify-between h-screen p-16"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.05 }}
        >
            <motion.div
                className="flex flex-row justify-center items-center w-full fixed h-16 top-0 left-0 right-0 z-10"
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { duration: 1, delay: 1 } }
                }}
            >
                <Link href="/">
                    <h3 className="text-lg">Bitspace</h3>
                </Link>
            </motion.div>
            {children}
        </motion.main>
    );
}
