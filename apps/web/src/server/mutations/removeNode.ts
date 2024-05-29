'use server';

import { createClient } from '@/supabase/server';
import { PrismaClient } from '@prisma/client';

export const removeNode = async (id: string) => {
    const prisma = new PrismaClient();
    const supabase = createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    await prisma.node.delete({
        where: {
            id,
            userId: user.id
        }
    });
};
