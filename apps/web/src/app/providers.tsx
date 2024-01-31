'use client';

import { PropsWithChildren } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { SessionProvider } from 'next-auth/react';
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false // Disable automatic pageview capture, as we capture manually
    });
}

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <SessionProvider>
            <HotkeysProvider initiallyActiveScopes={['commandMenuInvokable']}>{children}</HotkeysProvider>
        </SessionProvider>
    );
};
