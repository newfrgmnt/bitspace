'use client';

import { useCallback, useState } from 'react';
import { createSubscription } from './createSubscription';
import { ArrowForwardOutlined } from '@mui/icons-material';
import { Button } from '@bitspace/ui/button';
import { Input } from '@bitspace/ui/input';
import { Spinner } from '@/components/Spinner/Spinner';
import Link from 'next/link';

const isEmail = (email: string) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const Hero = () => {
    return (
        <div className="flex flex-col items-center max-w-4xl w-full gap-y-16 text-center">
            <h1 className="text-5xl md:text-8xl md:text-balance leading-normal md:leading-tight tracking-tight">
                Creative computing for everyone
            </h1>
            <p className="text-gray-500 text-2xl">
                A space for exploration & creative imagination
            </p>
            <Link href={`/login`}>
                <Button>Open Prototype</Button>
            </Link>
        </div>
    );
};
