import { Input, Output } from '@bitspace/circuit';
import { Vector2Schema } from '@bitspace/schemas';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import clsx from 'clsx';
import Draggable, { DraggableEventHandler } from 'react-draggable';

export interface VectorControlProps {
    port:
        | Input<z.infer<ReturnType<typeof Vector2Schema>>>
        | Output<z.infer<ReturnType<typeof Vector2Schema>>>;
    disabled?: boolean;
    onBlur?: (value: z.infer<ReturnType<typeof Vector2Schema>>) => void;
}

const JOYSTICK_SIZE = 16;
const getSamplingSize = (size: number) => size;

export const VectorControl = observer(
    ({ port, disabled, onBlur }: VectorControlProps) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const canvasRef = useRef<HTMLCanvasElement>(null);

        const [value, setValue] = useState<
            z.infer<ReturnType<typeof Vector2Schema>>
        >({ x: 0, y: 0 });

        useEffect(() => {
            const subscription = port.subscribe(value => {
                setValue(value);
            });

            return () => {
                subscription.unsubscribe();
            };
        }, [port]);

        const handleChange = useCallback(
            (position: { x: number; y: number }) => {
                if (!disabled) {
                    port.next(position);
                }
            },
            [port, disabled, onBlur]
        );

        const handleDrag: DraggableEventHandler = useCallback(
            (_, data) => {
                const rect = containerRef.current?.getBoundingClientRect();
                const containerWidth = getSamplingSize(rect?.width ?? 0);
                const containerHeight = getSamplingSize(rect?.height ?? 0);

                const x = (data.x / containerWidth) * 2 - 1;
                const y = 1 - (data.y / containerHeight) * 2;

                handleChange({ x, y });
            },
            [handleChange, containerRef]
        );

        const absolutePosition = useMemo(() => {
            if (!containerRef.current) return { x: 0, y: 0 };
            const rect = containerRef.current.getBoundingClientRect();

            const x = (value.x + 1) / 2;
            const y = 1 - (value.y + 1) / 2;

            const adjustedWidth = getSamplingSize(rect.width);
            const adjustedHeight = getSamplingSize(rect.height);

            return {
                x: x * adjustedWidth,
                y: y * adjustedHeight
            };
        }, [value, containerRef]);

        useEffect(() => {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');

                if (!ctx) return;
                const width = canvas.width;
                const height = canvas.height;

                ctx.clearRect(0, 0, width, height);

                // Draw vertical line
                ctx.beginPath();
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                ctx.strokeStyle = 'rgba(226, 232, 240, 1)';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Draw horizontal line
                ctx.beginPath();
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                ctx.strokeStyle = 'rgba(226, 232, 240, 1)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }, [value, containerRef]);

        return (
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-row gap-x-2">
                    {Object.entries(value).map(([key, val]) => (
                        <input
                            className={clsx(
                                'px-4 py-2 rounded-full w-full shadow-sm border border-slate-100 focus-visible:outline-slate-200',
                                {
                                    'text-slate-400': disabled
                                }
                            )}
                            type="number"
                            step={0.01}
                            placeholder={port.type.description}
                            value={val}
                            disabled={disabled}
                            onChange={e => {
                                port.next({
                                    ...value,
                                    [key]: parseFloat(e.target.value)
                                });
                            }}
                        />
                    ))}
                </div>
                <div
                    ref={containerRef}
                    className="w-full bg-slate-100 aspect-square rounded-2xl relative border border-slate-200 overflow-hidden"
                    style={{
                        backgroundImage:
                            'radial-gradient(rgba(203, 213, 225, 1) 6%, transparent 6%)',
                        backgroundPosition: '0 0',
                        backgroundSize: '25px 25px'
                    }}
                >
                    <Draggable
                        axis="both"
                        onDrag={handleDrag}
                        bounds={{
                            left: 0,
                            top: 0,
                            right: containerRef.current?.clientWidth ?? 0,
                            bottom: containerRef.current?.clientHeight ?? 0
                        }}
                        position={{
                            x: absolutePosition.x,
                            y: absolutePosition.y
                        }}
                        positionOffset={{
                            x: -(JOYSTICK_SIZE / 2),
                            y: -(JOYSTICK_SIZE / 2)
                        }}
                        disabled={disabled}
                    >
                        <div
                            className={clsx(
                                'absolute flex items-center justify-center rounded-full bg-slate-300 cursor-pointer z-10',
                                {
                                    'cursor-not-allowed': disabled
                                }
                            )}
                            style={{
                                width: JOYSTICK_SIZE,
                                height: JOYSTICK_SIZE
                            }}
                        >
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                    </Draggable>
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0"
                        width={containerRef.current?.clientWidth ?? 0}
                        height={containerRef.current?.clientHeight ?? 0}
                    />
                </div>
            </div>
        );
    }
);
