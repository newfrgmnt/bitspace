'use server';

import { getServerSideAPI } from '../../server/utils';

const api = getServerSideAPI();

export const createSubscription = async (email: string) => {
    return api.subscriptions.createFreeSubscription({
        freeSubscriptionCreate: {
            tier_id: 'af8fd983-d2af-4ab8-b191-747d1050df72',
            customer_email: email
        }
    });
};
