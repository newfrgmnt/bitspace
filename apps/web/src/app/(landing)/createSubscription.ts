'use server';

import { env } from '@/env';
import { getServerSideAPI } from '../../server/utils';
import { Platforms } from '@polar-sh/sdk';

export const createSubscription = async (email: string) => {
    const polar = getServerSideAPI(env.POLAR_ACCESS_KEY);

    return polar.subscriptions.createEmailSubscription({
        organizationName: 'newfrgmnt',
        platform: Platforms.GITHUB,
        subscriptionCreateEmail: {
            email
        }
    });
};
