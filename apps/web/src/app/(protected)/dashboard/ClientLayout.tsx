'use client';

import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { SignInWithGithub } from '../../../components/Auth/SignInWithGithub';
import posthog from 'posthog-js';
import { Avatar } from '../../../circuit/components/Avatar/Avatar';

export function ClientLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    const { status, data: auth } = useSession();

    return (
        <motion.main
            className="relative flex flex-col justify-between h-screen p-20"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: 0.05 }}
        >
            <motion.div
                className="flex flex-row justify-between items-center w-full sticky top-0 z-10"
                variants={{
                    initial: { opacity: 0 },
                    animate: {
                        opacity: 1,
                        transition: { duration: 1, delay: 1 }
                    }
                }}
            >
                <Link href="/">
                    <h3 className="text-3xl">Bitspace</h3>
                </Link>
                <div className="flex flex-row items-center gap-x-8 text-lg">
                    {status === 'authenticated' && auth.user?.image ? (
                        <Avatar
                            imageUrl={auth.user?.image}
                            onClick={() => {
                                signOut();
                                posthog.reset();
                            }}
                        />
                    ) : (
                        <SignInWithGithub />
                    )}
                </div>
            </motion.div>
            {children}
        </motion.main>
    );
}
