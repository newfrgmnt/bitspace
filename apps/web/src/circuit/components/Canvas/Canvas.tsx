/** @jsxImportSource @emotion/react */
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import * as React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import usePanZoom from 'use-pan-and-zoom';

import { fromCartesianPoint } from '../../utils/coordinates/coordinates';
import { CanvasProps } from './Canvas.types';
import { StoreContext } from '../..';
import { useDropzone } from '../../hooks/useDropzone/useDropzone';

export const Canvas = observer(
    React.forwardRef<HTMLDivElement, CanvasProps>(
        (
            {
                children,
                size,
                className,
                onMouseMove,
                onClick,
                onMouseDown,
                onMouseUp,
                onScroll,
                onDrop
            }: CanvasProps,
            ref
        ) => {
            const scrollRef = React.useRef<HTMLDivElement>(null);
            const { transform, setContainer, panZoomHandlers } = usePanZoom({
                enableZoom: false
            });
            const { store } = React.useContext(StoreContext);
            const dropHelpers = useDropzone(onDrop);

            React.useEffect(() => {
                if (scrollRef.current) {
                    setContainer(scrollRef.current);

                    const { x, y } = fromCartesianPoint(
                        size.width,
                        size.height,
                        0,
                        0
                    );
                    const { x: offsetX, y: offsetY } = fromCartesianPoint(
                        scrollRef.current.clientWidth,
                        scrollRef.current.clientHeight,
                        0,
                        0
                    );

                    scrollRef.current.scrollTo({
                        left: x - offsetX,
                        top: y - offsetY
                    });

                    const resizeObserver = new ResizeObserver(entries => {
                        for (const entry of entries) {
                            store.setCanvasSize({
                                width: entry.contentRect.width,
                                height: entry.contentRect.height
                            });
                        }
                    });

                    resizeObserver.observe(scrollRef.current);

                    return () => {
                        resizeObserver.disconnect();
                    };
                }
                // eslint-disabled-next-line react-hooks/exhaustive-deps
            }, [store]);

            const handleMouseDown = React.useCallback(
                (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    if (e.button === 1) {
                        e.preventDefault();

                        panZoomHandlers?.onMouseDown?.(e);
                    }
                },
                [panZoomHandlers]
            );

            return (
                <div
                    ref={scrollRef}
                    className={clsx(
                        'w-full h-full overflow-auto bg-[#f0f2f7] text-slate-400',
                        className
                    )}
                    {...panZoomHandlers}
                    onMouseDown={handleMouseDown}
                    onScroll={onScroll}
                >
                    <motion.div
                        ref={ref}
                        className="relative"
                        style={{
                            width: size.width,
                            height: size.height,
                            backgroundImage:
                                'radial-gradient(rgba(0,0,0,.15) 3%, transparent 3%)',
                            backgroundPosition: '0 0',
                            backgroundSize: '50px 50px',
                            transform
                        }}
                        animate="animate"
                        initial="initial"
                        transition={{
                            staggerChildren: 0.2
                        }}
                        onMouseMove={onMouseMove}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onClick={onClick}
                        {...dropHelpers}
                    >
                        {children}
                    </motion.div>
                </div>
            );
        }
    )
);
