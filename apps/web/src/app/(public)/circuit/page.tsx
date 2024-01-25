import { Platforms } from '@polar-sh/sdk';
import ClientPage from './ClientPage';
import { authOptions, getServerSideAPI } from '../../../utils';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const SUBSCRIPTION_TIER_ID = `3bfaec57-603b-4e55-aa2d-d634f6e5c89b`;

const cacheConfig = {
    next: {
        revalidate: 30 // 30 seconds
    }
};

export default async function Page() {
    const session = await getServerSession(authOptions);

    const api = getServerSideAPI(process.env.POLAR_ACCESS_KEY);
    const usersWithSubscription = (
        await api.subscriptions.searchSubscriptions(
            {
                limit: 99999,
                platform: Platforms.GITHUB,
                organizationName: 'emilwidlund',
                subscriptionTierId: SUBSCRIPTION_TIER_ID
            },
            cacheConfig
        )
    ).items?.map(item => item.user.email);

    if (
        !usersWithSubscription?.includes(session?.user?.email ?? '') &&
        session?.user?.email !== 'hello@emilwidlund.com' &&
        process.env.NODE_ENV === 'production'
    ) {
        redirect('/preview-access');
    }

    return <ClientPage />;
}
