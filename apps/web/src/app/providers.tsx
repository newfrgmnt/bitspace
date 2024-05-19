'use client';

import { PropsWithChildren } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
    posthog.init(process.env.POSTHOG_API_KEY as string, {
        api_host: process.env.POSTHOG_API_HOST as string
    });
}

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <HotkeysProvider initiallyActiveScopes={['commandMenuInvokable']}>
            {children}
        </HotkeysProvider>
    );
};
