import { Configuration, HTTPHeaders, PolarAPI } from '@polar-sh/sdk';
import { cookies } from 'next/headers';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? ''
        })
    ]
};

export const getServerSideAPI = (token?: string): PolarAPI => {
    let headers: HTTPHeaders | undefined;

    if (token) {
        headers = {
            Authorization: `Bearer ${token}`
        };
    } else {
        const cookieStore = cookies();
        headers = {
            Cookie: cookieStore.toString()
        };
    }

    return new PolarAPI(
        new Configuration({
            credentials: 'include',
            headers
        })
    );
};
