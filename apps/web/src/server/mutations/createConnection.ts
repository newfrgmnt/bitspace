'use server';

import { PrismaClient } from '@bitspace/supabase/prisma';

export const createConnection = async (fromId: string, toId: string) => {
    const prisma = new PrismaClient();

    return await prisma.connection.create({
        data: {
            fromId,
            toId
        }
    });
};
