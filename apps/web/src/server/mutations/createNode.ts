'use server';

import { PrismaClient } from '@prisma/client';
import { createClient } from '@/supabase/server';
import { generateIncludeStructure } from '../utils';

export const createNode = async (data: any) => {
    const supabase = createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;
    const prisma = new PrismaClient();

    return await prisma.node.create({
        data: {
            ...data,
            userId: user.id
        },
        include: generateIncludeStructure(10)
    });
};
