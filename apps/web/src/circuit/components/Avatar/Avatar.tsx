import clsx from 'clsx';
import { ComponentProps } from 'react';

export interface AvatarProps extends ComponentProps<'div'> {
    imageUrl?: string;
    className?: string;
}

export const Avatar = ({ imageUrl, className, ...props }: AvatarProps) => {
    return (
        <div
            className={clsx(
                'w-10 h-10 rounded-full bg-center bg-cover border border-white bg-slate-300',
                className
            )}
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
            {...props}
        />
    );
};
