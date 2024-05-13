'use server';

import { PrismaClient } from '@prisma/client';

export const createCircuit = async () => {
    const prisma = new PrismaClient();
    const circuit = await prisma.node.create({
        data: {
            name: 'Untitled',
            type: 'CIRCUIT',
            position: {
                create: {
                    x: 0,
                    y: 0
                }
            }
        }
    });

    return circuit;
};
