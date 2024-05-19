'use client';

import { createClient } from '@/supabase/browser';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import React, {
    useContext,
    useState,
    useEffect,
    createContext,
    PropsWithChildren,
    useMemo
} from 'react';

interface AuthContextValue {
    signOut: () => Promise<any>;
    user: User | undefined;
}

export const defaultAuthContextValue: AuthContextValue = {
    signOut: async () => {},
    user: undefined
};

// create a context for authentication
const AuthContext = createContext<AuthContextValue>(defaultAuthContextValue);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const supabase = createClient();

    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user);
            setLoading(false);
        });

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user);
            setLoading(false);

            if (event === 'SIGNED_OUT') {
                redirect('/');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    const contextValue = useMemo(
        () => ({
            user,
            signOut: () => supabase.auth.signOut()
        }),
        [user, supabase]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};
