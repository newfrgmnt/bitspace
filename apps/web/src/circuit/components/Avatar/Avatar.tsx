import clsx from 'clsx';

export interface AvatarProps {
    imageUrl: string;
    className?: string;
}

export const Avatar = ({ imageUrl, className }: AvatarProps) => {
    return (
        <div
            className={clsx(
                'w-10 h-10 rounded-full bg-center bg-cover border border-white',
                className
            )}
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        />
    );
};
