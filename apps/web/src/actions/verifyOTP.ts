'use server';

import { createClient } from '@bitspace/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { verifyOTPSchema } from './schema';
import { action } from './safe-action';

export const verifyOTPAction = action(
    verifyOTPSchema,
    async ({ email, token }) => {
        const supabase = createClient();

        const { data: user, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email'
        });

        if (error) {
            redirect('/error');
        }

        revalidatePath('/dashboard', 'layout');
        redirect('/dashboard');
    }
);
