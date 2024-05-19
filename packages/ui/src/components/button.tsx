import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export const Button = ({ className, ...props }: ComponentProps<'button'>) => {
    return (
        <button
            className={twMerge(
                'bg-black text-white px-6 py-3 rounded-full flex flex-row items-center justify-center gap-x-4 shadow-2xl',
                props.disabled
                    ? 'bg-slate-200'
                    : 'hover:bg-white hover:text-black transition-colors duration-200 ease-in-out ',
                className
            )}
            {...props}
        />
    );
};
