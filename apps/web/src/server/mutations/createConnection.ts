'use server';

import { PrismaClient } from '@prisma/client';

export const createConnection = async (fromId: string, toId: string) => {
    const prisma = new PrismaClient();

    console.log(fromId, toId);

    return await prisma.connection.create({
        data: {
            fromId,
            toId
        }
    });
};
