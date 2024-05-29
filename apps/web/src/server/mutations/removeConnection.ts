'use server';

import { PrismaClient } from '@prisma/client';

export const removeConnection = async (fromId: string, toId: string) => {
    const prisma = new PrismaClient();

    return await prisma.connection.delete({
        where: {
            fromId,
            toId
        }
    });
};
