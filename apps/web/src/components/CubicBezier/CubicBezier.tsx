import { cubicBezier } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Draggable, { DraggableProps } from 'react-draggable';

interface Position {
    x: number;
    y: number;
}

export interface CubicBezierProps {
    points: [number, number, number, number];
}

export const CubicBezier = ({ points: controls }: CubicBezierProps) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const [points, setPosition] = useState<[number, number, number, number]>(controls);

    const [xy1, xy2] = useMemo(() => {
        const [x1, y1, x2, y2] = points;

        const xy1 = { x: x1 * 222, y: 222 - y1 * 222 };
        const xy2 = { x: x2 * 222, y: 222 - y2 * 222 };

        return [xy1, xy2];
    }, [points]);

    useEffect(() => {
        const ctx = ref.current?.getContext('2d');

        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.moveTo(0, ctx.canvas.height ?? 0);
        ctx.lineTo(xy1.x, xy1.y);
        ctx.strokeStyle = '#000';
        ctx.stroke();

        ctx.moveTo(ctx.canvas.width ?? 0, 0);
        ctx.lineTo(xy2.x, xy2.y);
        ctx.strokeStyle = '#000';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height ?? 0);
        ctx.bezierCurveTo(xy1.x, xy1.y, xy2.x, xy2.y, ctx.canvas.width, 0);
        ctx.strokeStyle = '#0000ff';
        ctx.lineWidth = 2;

        ctx.stroke();
    }, [xy1, xy2]);

    return (
        <div className="relative h-[226px] w-full">
            <canvas ref={ref} className="absolute inset-0 rounded-2xl" width={222} height={222} />
            <ControlPoint
                bounds="parent"
                position={xy1}
                onDrag={(e, data) => {
                    setPosition(position => [data.x / 222, 1 - data.y / 222, position[2], position[3]]);
                }}
            />
            <ControlPoint
                bounds="parent"
                position={xy2}
                onDrag={(e, data) => {
                    setPosition(position => [position[0], position[1], data.x / 222, 1 - data.y / 222]);
                }}
            />
        </div>
    );
};

const ControlPoint = (props: Partial<DraggableProps>) => {
    return (
        <Draggable {...props} onMouseDown={e => e.stopPropagation()}>
            <div className="w-3 h-3 rounded-full bg-black absolute -top-1.5 -left-1.5" />
        </Draggable>
    );
};
