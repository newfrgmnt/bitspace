import { AuthProvider } from '@/hooks/useAuth';
import { createClient } from '@bitspace/supabase/server';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
    const supabase = createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return <AuthProvider>{children}</AuthProvider>;
}
