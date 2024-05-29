'use server';

import { createClient } from '@/supabase/server';
import { PrismaClient } from '@prisma/client';

export const removeConnection = async (fromId: string, toId: string) => {
    const prisma = new PrismaClient();
    const supabase = createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    return await prisma.connection.delete({
        where: {
            fromId,
            toId,
            to: {
                node: {
                    userId: user.id
                }
            },
            from: {
                node: {
                    userId: user.id
                }
            }
        },
        include: {
            from: true,
            to: true
        }
    });
};
