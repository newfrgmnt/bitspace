'use server';

import { createClient } from '@/supabase/server';
import { PrismaClient } from '@prisma/client';

export const moveNode = async (
    nodeId: string,
    position: { x: number; y: number }
) => {
    const prisma = new PrismaClient();
    const supabase = createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    return await prisma.nodePosition.update({
        where: { nodeId, node: { userId: user.id } },
        data: {
            x: position.x,
            y: position.y
        },
        include: { node: true }
    });
};
