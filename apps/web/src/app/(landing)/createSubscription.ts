'use server';

import { env } from '@/env';
import { getServerSideAPI } from '../../server/utils';

const api = getServerSideAPI();

export const createSubscription = async (email: string) => {
    return fetch(
        'https://api.polar.sh/api/v1/subscriptions/subscriptions/email?organization_name=newfrgmnt&platform=github',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.POLAR_ACCESS_KEY}`
            },
            body: JSON.stringify({ email })
        }
    ).then(res => res.json());
};
