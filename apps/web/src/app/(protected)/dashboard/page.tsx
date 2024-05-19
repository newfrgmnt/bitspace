import { PrismaClient } from '@prisma/client';
import ClientPage from './ClientPage';

export default async function Page() {
    const prisma = new PrismaClient();
    const circuits = await prisma.node.findMany({ where: { type: 'CIRCUIT' } });

    return <ClientPage circuits={circuits} />;
}
