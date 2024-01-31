'use client';

import { PropsWithChildren } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { SessionProvider } from 'next-auth/react';
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
    posthog.init(process.env.POSTHOG_API_KEY as string, {
        api_host: process.env.POSTHOG_API_HOST as string,
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
