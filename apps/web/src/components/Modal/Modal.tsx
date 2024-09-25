import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, {
    FunctionComponent,
    MouseEvent,
    useCallback,
    useEffect
} from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';

export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
    className?: string;
}

export const Modal: FunctionComponent<ModalProps> = ({
    isShown,
    hide,
    modalContent,
    className
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const onKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            const contains = ref.current?.contains(event.target as Node);

            if (event.keyCode === 27 && isShown && contains) {
                hide();
            }
        },
        [hide, isShown]
    );

    useEffect(() => {
        isShown
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'unset');
    }, [isShown, hide]);

    const onInnerClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    const modal = (
        <React.Fragment>
            <FocusLock>
                <div
                    ref={ref}
                    className="fixed bottom-0 left-0 right-0 top-0 z-50 overflow-hidden focus-within:outline-none"
                    aria-modal
                    tabIndex={-1}
                    role="dialog"
                    onKeyDown={onKeyDown}
                >
                    <div
                        className="flex h-full flex-col items-center bg-black/50 p-2 md:w-full"
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            hide();
                        }}
                    >
                        <div className="block h-[80px] w-2 lg:max-h-[10%] lg:grow-[2]"></div>
                        <motion.div
                            className={clsx(
                                'rounded-3xl relative z-10 flex max-h-full w-full flex-col overflow-hidden bg-white shadow lg:w-[800px] lg:max-w-full dark:border',
                                className
                            )}
                            initial={{ opacity: 0, scale: 0.99 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.1, ease: 'easeInOut' }}
                            onClick={onInnerClick}
                        >
                            {modalContent}
                        </motion.div>
                    </div>
                </div>
            </FocusLock>
        </React.Fragment>
    );

    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
