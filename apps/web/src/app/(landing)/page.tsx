import type { Metadata } from 'next';
import { CircuitExample } from './CircuitExample';
import { ComponentProps } from 'react';
import clsx from 'clsx';

export const metadata: Metadata = {
    title: 'Bitspace',
    description: 'A creative environment for the 21st century'
};

export default function Page() {
    return (
        <div className="flex flex-col items-center gap-y-32">
            <div className="flex flex-col items-center max-w-4xl w-full gap-y-16">
                <h1 className="text-7xl text-center text-balance leading-snug tracking-tight">
                    A creative environment for the 21st century
                </h1>
                <Button>Join the Waitlist</Button>
            </div>
            <div className="w-full flex flex-col">
                <CircuitExample />
            </div>
        </div>
    );
}

const Button = ({ className, ...props }: ComponentProps<'button'>) => {
    return (
        <button
            className={clsx(
                'bg-black text-white px-6 py-3 rounded-full flex flex-row items-center justify-center gap-x-4 hover:bg-white hover:text-black transition-colors duration-300 ease-in-out shadow-2xl',
                className
            )}
            {...props}
        />
    );
};
