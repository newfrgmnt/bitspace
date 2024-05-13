'use server';

import { PrismaClient } from '@prisma/client';

export const generateIncludeStructure = (depth: number) => {
    if (depth === 0) {
        return {};
    }

    return {
        inputs: true,
        outputs: {
            include: {
                connections: true
            }
        },
        position: true,
        children: {
            include: generateIncludeStructure(depth - 1)
        }
    };
};

export const getCircuit = async (id: string) => {
    const prisma = new PrismaClient();

    return await prisma.node.findUnique({
        where: { id: id as string, type: 'CIRCUIT' },
        include: generateIncludeStructure(10)
    });
};
