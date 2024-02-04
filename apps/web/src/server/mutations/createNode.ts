'use server';

import { PrismaClient } from '@prisma/client';
import { generateIncludeStructure } from '../query/getCircuit';

export const createNode = async (data: any) => {
    const prisma = new PrismaClient();

    return await prisma.node.create({
        data,
        include: generateIncludeStructure(10)
    });
};
