import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = ({ className, ...props }: ComponentProps<'input'>) => {
    return (
        <input
            className={twMerge(
                'bg-slate-200/50 rounded-full px-6 py-3 focus-visible:outline-none',
                className
            )}
            onKeyDown={e => {
                e.stopPropagation();
            }}
            {...props}
        />
    );
};
