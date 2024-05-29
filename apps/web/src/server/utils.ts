import { Configuration, HTTPHeaders, PolarAPI } from '@polar-sh/sdk';
import { cookies } from 'next/headers';

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

// @ts-ignore
export const generateIncludeStructure = (depth: number) => {
    if (depth === 0) {
        return {};
    }

    return {
        inputs: true,
        outputs: {
            include: {
                connections: true
            }
        },
        position: true,
        children: {
            include: generateIncludeStructure(depth - 1)
        }
    };
};
