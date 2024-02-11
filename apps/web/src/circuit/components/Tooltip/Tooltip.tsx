import clsx from 'clsx';
import * as React from 'react';
import { CSSProperties } from 'react';

import { ITooltipNodeProps, ITooltipProps, TooltipPosition } from './Tooltip.types';
import { useHover } from '../../hooks/useHover/useHover';

const getPositionalStyles = (
    position: TooltipPosition,
    dimensions: { width: number; height: number },
    offset: { x: number; y: number } = { x: 0, y: 0 }
): CSSProperties => {
    const generalOffset = -10;
    const combinedOffset = { x: -offset.x + generalOffset, y: -offset.y + generalOffset };
    const { x, y } = combinedOffset;
    const [verticalOffset, horizontalOffset] = [
        `calc(${y}px + -${dimensions.height}px)`,
        `calc(${x}px + -${dimensions.width}px)`
    ];

    switch (position) {
        case TooltipPosition.TOP:
            return {
                top: verticalOffset,
                left: '50%',
                transform: 'translate(-50%, -50%)'
            };
        case TooltipPosition.TOP_RIGHT:
            return {
                top: verticalOffset,
                right: horizontalOffset
            };
        case TooltipPosition.RIGHT:
            return {
                right: horizontalOffset
            };
        case TooltipPosition.BOTTOM_RIGHT:
            return {
                right: horizontalOffset,
                bottom: verticalOffset
            };
        case TooltipPosition.BOTTOM:
            return {
                bottom: verticalOffset,
                left: '50%',
                transform: 'translate(-50%, -50%)'
            };
        case TooltipPosition.BOTTOM_LEFT:
            return {
                bottom: verticalOffset,
                left: horizontalOffset
            };
        case TooltipPosition.LEFT:
            return {
                left: horizontalOffset
            };
        case TooltipPosition.TOP_LEFT:
            return {
                left: horizontalOffset,
                top: verticalOffset
            };
    }
};

const TooltipNode = ({ text, position, offset }: ITooltipNodeProps) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        const { width, height } = ref.current?.getBoundingClientRect() || { width: 0, height: 0 };

        setDimensions({ width, height });
    }, []);

    return (
        <span
            ref={ref}
            className="absolute flex flex-row py-1 px-2 rounded-md bg-white text-xxs text-slate-500 drop-shadow-lg z-20 nowrap"
            style={getPositionalStyles(position, dimensions, offset)}
        >
            {text}
        </span>
    );
};

export const Tooltip = ({ children, className, ...tooltipNodeProps }: ITooltipProps) => {
    const { onMouseEnter, onMouseLeave, isHovered } = useHover();

    return (
        <div className={clsx('flex', className)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div>{children}</div>
            {isHovered && <TooltipNode {...tooltipNodeProps} />}
        </div>
    );
};
