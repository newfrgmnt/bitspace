import { PrismaClient } from '@prisma/client';
import ClientPage from './ClientPage';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../utils';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await getServerSession(authOptions);

    const prisma = new PrismaClient();
    const bits = await prisma.bit.findMany();

    if (
        // !usersWithSubscription?.includes(session?.user?.email ?? '') &&
        session?.user?.email !== 'hello@emilwidlund.com'
    ) {
        redirect('/demo');
    }

    return <ClientPage bits={bits} />;
}
