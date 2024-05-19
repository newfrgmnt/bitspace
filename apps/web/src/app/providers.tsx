'use client';

import { PropsWithChildren } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';
import posthog from 'posthog-js';
import { env } from '@/env';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_API_KEY, {
        api_host: env.NEXT_PUBLIC_POSTHOG_HOST
    });
}

export function PHProvider({ children }: PropsWithChildren) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <PHProvider>
            <HotkeysProvider initiallyActiveScopes={['commandMenuInvokable']}>
                {children}
            </HotkeysProvider>
        </PHProvider>
    );
};
