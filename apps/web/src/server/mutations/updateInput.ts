'use server';

import { PrismaClient } from '@prisma/client';

export const updateInput = async (id: string, value: any) => {
    const prisma = new PrismaClient();

    console.log(value);

    await prisma.input.update({
        where: {
            id
        },
        data: {
            value
        }
    });
};
