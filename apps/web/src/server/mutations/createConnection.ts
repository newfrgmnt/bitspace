'use server';

import { createClient } from '@/supabase/server';
import { PrismaClient } from '@prisma/client';

export const createConnection = async (fromId: string, toId: string) => {
    const prisma = new PrismaClient();
    const supabase = createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    return await prisma.connection.create({
        data: {
            fromId,
            toId
        }
    });
};
