'use client';

import { PropsWithChildren } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';

export const Providers = ({ children }: PropsWithChildren) => {
    return <HotkeysProvider initiallyActiveScopes={['commandMenuInvokable']}>{children}</HotkeysProvider>;
};
