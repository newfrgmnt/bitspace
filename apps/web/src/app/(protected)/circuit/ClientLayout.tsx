'use client';

import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { SignInWithGithub } from '../../../components/Auth/SignInWithGithub';
import { useNestedCircuit } from '../../../hooks/useNestedCircuit/useNestedCircuit';
import { ArrowBackOutlined } from '@mui/icons-material';
import posthog from 'posthog-js';
import { useEffect } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }): JSX.Element {
    const { status, data: auth } = useSession();
    const { previous } = useNestedCircuit();

    const session = useSession();

    useEffect(() => {
        posthog.identify(session.data?.user?.email ?? '');
    }, []);

    return (
        <motion.main
            className="relative flex flex-col justify-between h-screen p-12"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.05 }}
        >
            <motion.div
                className="flex flex-row justify-between items-center w-full sticky top-0 z-10"
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { duration: 1, delay: 1 } }
                }}
            >
                <div className="flex flex-row gap-x-4">
                    {previous && (
                        <Link
                            className="flex flex-row justify-center items-center bg-white rounded-full h-10 w-10 shadow-sm"
                            href={`/circuit/${previous}`}
                        >
                            <ArrowBackOutlined fontSize="small" />
                        </Link>
                    )}
                </div>
                <Link href="/">
                    <h3 className="text-2xl">Bitspace</h3>
                </Link>
                {status === 'authenticated' ? (
                    <div
                        className="w-10 h-10 bg-cover bg-center rounded-full"
                        style={{
                            backgroundImage: `url(${auth.user?.image})`
                        }}
                        onClick={() => {
                            signOut();
                            posthog.reset();
                        }}
                    />
                ) : (
                    <SignInWithGithub />
                )}
            </motion.div>
            {children}
        </motion.main>
    );
}
