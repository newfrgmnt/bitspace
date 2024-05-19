'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../supabase/server';

export async function loginAction(formData: FormData) {
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string
    };

    const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
            emailRedirectTo: 'https://bitspace.sh/dashboard'
        }
    });

    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect(`/code?email=${data.email}`);
}
