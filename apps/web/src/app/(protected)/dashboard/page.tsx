import { PrismaClient } from '@prisma/client';
import ClientPage from './ClientPage';
import { createClient } from '@/supabase/server';

export default async function Page() {
    const supabase = createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    const prisma = new PrismaClient();
    const circuits = await prisma.node.findMany({
        where: { type: 'CIRCUIT', userId: user.id }
    });

    return <ClientPage circuits={circuits} />;
}
