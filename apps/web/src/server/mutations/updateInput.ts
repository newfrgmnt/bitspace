'use server';

import { PrismaClient } from '@prisma/client';

export const updateInput = async (id: string, value: any) => {
    const prisma = new PrismaClient();

    await prisma.input.update({
        where: {
            id
        },
        data: {
            value
        }
    });
};
