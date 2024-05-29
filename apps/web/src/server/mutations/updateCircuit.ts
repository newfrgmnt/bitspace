'use server';

import { createClient } from '@/supabase/server';
import { PrismaClient } from '@prisma/client';

export const updateCircuit = async (id: string, data: { name?: string }) => {
    const prisma = new PrismaClient();
    const supabase = createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    await prisma.node.update({
        where: {
            id,
            type: 'CIRCUIT',
            userId: user.id
        },
        data
    });
};
