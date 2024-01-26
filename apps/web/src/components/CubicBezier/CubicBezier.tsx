import { cubicBezier } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Draggable, { DraggableProps } from 'react-draggable';

interface Position {
    x: number;
    y: number;
}

export interface CubicBezierProps {
    points: [number, number, number, number];
    onChange: (points: [number, number, number, number]) => void;
}

export const CubicBezier = ({ points: controls, onChange }: CubicBezierProps) => {
    const [points, setPosition] = useState<[number, number, number, number]>(controls);

    const [xy1, xy2] = useMemo(() => {
        const [x1, y1, x2, y2] = points;

        const xy1 = { x: x1 * 222, y: 222 - y1 * 222 };
        const xy2 = { x: x2 * 222, y: 222 - y2 * 222 };

        return [xy1, xy2];
    }, [points]);

    useEffect(() => {
        onChange(points);
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
                {/** Subdivision Lines */}
                <line x1={55} x2={55} y1={0} y2={222} stroke="#f1f5f9" strokeWidth="2" />
                <line x1={111} x2={111} y1={0} y2={222} stroke="#f1f5f9" strokeWidth="2" />
                <line x1={166} x2={166} y1={0} y2={222} stroke="#f1f5f9" strokeWidth="2" />
                <line x1={0} x2={222} y1={55} y2={55} stroke="#f1f5f9" strokeWidth="2" />
                <line x1={0} x2={222} y1={111} y2={111} stroke="#f1f5f9" strokeWidth="2" />
                <line x1={0} x2={222} y1={166} y2={166} stroke="#f1f5f9" strokeWidth="2" />

                {/** Handle Lines */}
                <line x1={0} x2={xy1.x} y1={222} y2={xy1.y} stroke="#94a3b8" strokeWidth="2" />
                <line x1={222} x2={xy2.x} y1={0} y2={xy2.y} stroke="#94a3b8" strokeWidth="2" />

                <path
                    d={`M 0 222 C ${xy1.x} ${xy1.y}, ${xy2.x} ${xy2.y}, 222 0`}
                    stroke="#0000ff"
                    strokeWidth={2}
                    fill="none"
                />
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
