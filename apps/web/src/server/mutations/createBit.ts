'use server';

import { PrismaClient } from '@prisma/client';

export const createBit = async () => {
    const prisma = new PrismaClient();
    const node = await prisma.node.create({
        data: {
            type: 'CIRCUIT',
            position: {
                create: {
                    x: 0,
                    y: 0
                }
            }
        }
    });

    const bit = await prisma.bit.create({
        data: {
            name: 'Untitled',
            root: {
                connect: {
                    id: node.id
                }
            }
        }
    });

    return bit;
};
