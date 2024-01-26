import { useCallback } from 'react';
import { NodeWindow } from '../circuit/components/Node/Node';
import { CubicBezier } from '../components/CubicBezier/CubicBezier';
import { CubicBezier as CubicBezierNode } from '../nodes/easings/CubicBezier/CubicBezier';
import { cubicBezier } from 'framer-motion';

export const CubicBezierWindow = ({ node }: { node: CubicBezierNode }) => {
    const handleChange = useCallback(
        (points: [number, number, number, number]) => {
            node.outputs.easing.next(cubicBezier.apply(this, points));
        },
        [node]
    );

    return (
        <NodeWindow className="!shadow-none border-slate-100 bg-slate-50 border-2 p-0 overflow-visible">
            <CubicBezier points={[0.65, 0, 0.35, 1]} onChange={handleChange} />
        </NodeWindow>
    );
};
