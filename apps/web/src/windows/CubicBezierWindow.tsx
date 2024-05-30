import { useCallback, useEffect, useState } from 'react';
import { NodeWindow } from '../circuit/components/Node/Node';
import { CubicBezier } from '../components/CubicBezier/CubicBezier';
import { CubicBezier as CubicBezierNode } from '../../../../packages/nodes/src/easings/CubicBezier/CubicBezier';

export const CubicBezierWindow = ({ node }: { node: CubicBezierNode }) => {
    const [points, setPoints] = useState<[number, number, number, number]>([
        0, 0, 1, 1
    ]);

    const handleChange = useCallback(
        ([x1, y1, x2, y2]: [number, number, number, number]) => {
            node.inputs.x1.next(x1);
            node.inputs.y1.next(y1);
            node.inputs.x2.next(x2);
            node.inputs.y2.next(y2);
        },
        [node]
    );

    useEffect(() => {
        const sub = node.outputs.easing.subscribe(setPoints);

        return () => sub.unsubscribe();
    }, [node]);

    return (
        <NodeWindow className="!shadow-none border-slate-100 bg-slate-50 border-2 p-0 overflow-visible">
            <CubicBezier points={points} onChange={handleChange} />
        </NodeWindow>
    );
};
