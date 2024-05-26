'use server';

import { PrismaClient } from '@bitspace/supabase/prisma';

export const moveNode = async (
    nodeId: string,
    position: { x: number; y: number }
) => {
    const prisma = new PrismaClient();

    return await prisma.nodePosition.update({
        where: { nodeId },
        data: {
            x: position.x,
            y: position.y
        }
    });
};
