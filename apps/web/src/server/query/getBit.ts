'use server';

import { PrismaClient } from '@prisma/client';
import { generateIncludeStructure } from './getCircuit';

export const getBit = async (id: string) => {
    const prisma = new PrismaClient();

    return await prisma.bit.findUnique({
        where: { id: id as string },
        include: {
            root: {
                include: generateIncludeStructure(10)
            }
        }
    });
};
