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

    return (
        <div className="relative h-[226px] w-full">
            <svg
                className="rounded-3xl"
                viewBox="0 0 222 222"
                height={222}
                width={222}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d={`M 0 222 C ${xy1.x} ${xy1.y}, ${xy2.x} ${xy2.y}, 222 0`}
                    stroke="#0000ff"
                    strokeWidth={2}
                    fill="none"
                />
                <line x1={0} x2={xy1.x} y1={222} y2={xy1.y} stroke="#94a3b8" stroke-width="2" />
                <line x1={222} x2={xy2.x} y1={0} y2={xy2.y} stroke="#94a3b8" stroke-width="2" />
            </svg>
            <ControlPoint
                position={xy1}
                onDrag={(e, data) => {
                    setPosition(position => [data.x / 222, 1 - data.y / 222, position[2], position[3]]);
                }}
            />
            <ControlPoint
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
        <Draggable
            {...props}
            onMouseDown={e => e.stopPropagation()}
            bounds={{
                left: 0,
                right: 222,
                top: 0,
                bottom: 222
            }}
        >
            <div className="w-2 h-2 rounded-full bg-[#94a3b8] absolute -top-1 -left-1" />
        </Draggable>
    );
};
