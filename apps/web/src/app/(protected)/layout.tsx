import { AuthProvider } from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    return <AuthProvider>{children}</AuthProvider>;
}
