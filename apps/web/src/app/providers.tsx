'use client';

import { PropsWithChildren } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <SessionProvider>
            <HotkeysProvider initiallyActiveScopes={['commandMenuInvokable']}>{children}</HotkeysProvider>
        </SessionProvider>
    );
};
