import { PrismaClient } from '@prisma/client';
import ClientPage from './ClientPage';
import { redirect } from 'next/navigation';

import { createClient } from '@/supabase/server';

export default async function Page() {
    const supabase = createClient();
    const prisma = new PrismaClient();
    const circuits = await prisma.node.findMany({ where: { type: 'CIRCUIT' } });

    const { data, error } = await supabase.auth.getUser();

    console.log(data);

    if (error || !data?.user) {
        redirect('/login');
    }

    return <ClientPage circuits={circuits} />;
}
