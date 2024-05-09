import clsx from 'clsx';
import { HTMLMotionProps, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

export const Panel = observer(({ children, className, ...props }: PropsWithChildren<HTMLMotionProps<'div'>>) => {
    return (
        <motion.div
            className={clsx('p-10 rounded-[2rem] bg-white shadow-2xl overflow-y-auto flex flex-col gap-y-8', className)}
            initial="initial"
            animate="animate"
            {...props}
        >
            {children}
        </motion.div>
    );
});
