'use server';

import { createClient } from '@/supabase/server';
import { PrismaClient } from '@prisma/client';
import { generateIncludeStructure } from '../utils';

export const getCircuit = async (id: string) => {
    const supabase = createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    const prisma = new PrismaClient();

    if (!user) {
        return null;
    }

    const node = await prisma.node.findUnique({
        where: { id: id as string, type: 'CIRCUIT', userId: user.id },
        include: generateIncludeStructure(10)
    });

    return node;
};
