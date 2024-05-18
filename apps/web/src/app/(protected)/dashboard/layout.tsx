import { getServerSession } from 'next-auth';
import { authOptions } from '../../../server/utils';
import { ClientLayout } from './ClientLayout';

export default async function Layout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // Polar Auth
    /* 
    
    
const SUBSCRIPTION_TIER_ID = `3bfaec57-603b-4e55-aa2d-d634f6e5c89b`;

const cacheConfig = {
    next: {
        revalidate: 30 // 30 seconds
    }
};

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
    ).items?.map(item => item.user.email); */

    return <ClientLayout>{children}</ClientLayout>;
}
