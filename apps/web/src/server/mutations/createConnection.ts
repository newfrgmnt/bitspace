'use server';

import { PrismaClient } from '@prisma/client';

export const createConnection = async (fromId: string, toId: string) => {
    const prisma = new PrismaClient();

    return await prisma.connection.create({
        data: {
            fromId,
            toId
        }
    });
};
