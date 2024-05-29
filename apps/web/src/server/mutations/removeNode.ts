'use server';

import { PrismaClient } from '@prisma/client';

export const removeNode = async (id: string) => {
    const prisma = new PrismaClient();

    await prisma.node.delete({
        where: {
            id
        }
    });
};
