'use server';

import { PrismaClient } from '@bitspace/supabase/prisma';

export const removeNode = async (id: string) => {
    const prisma = new PrismaClient();

    await prisma.node.delete({
        where: {
            id
        }
    });
};
