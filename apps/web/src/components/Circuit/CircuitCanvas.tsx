import { PropsWithChildren } from 'react';

export interface CircuitCanvasProps extends PropsWithChildren {}

export const CircuitCanvas = (props: CircuitCanvasProps) => {
    return (
        <div className="overflow-auto fixed inset-0">
            <div className="w-[10000px] h-[10000px] bg-slate-100">{props.children}</div>
        </div>
    );
};
