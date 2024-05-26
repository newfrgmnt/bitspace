'use server';

import { PrismaClient } from '@bitspace/supabase/prisma';

export const removeConnection = async (fromId: string, toId: string) => {
    const prisma = new PrismaClient();

    return await prisma.connection.delete({
        where: {
            fromId,
            toId
        }
    });
};
