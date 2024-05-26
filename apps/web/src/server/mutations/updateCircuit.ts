'use server';

import { PrismaClient } from '@bitspace/supabase/prisma';

export const updateCircuit = async (id: string, data: { name?: string }) => {
    const prisma = new PrismaClient();

    await prisma.node.update({
        where: {
            id,
            type: 'CIRCUIT'
        },
        data
    });
};
