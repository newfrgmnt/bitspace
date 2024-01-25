import { NodeWindow } from '../circuit/components/Node/Node';
import { CubicBezier } from '../components/CubicBezier/CubicBezier';
import { CubicBezier as CubicBezierNode } from '../nodes/utilities/CubicBezier/CubicBezier';

export const CubicBezierWindow = ({ node }: { node: CubicBezierNode }) => {
    return (
        <NodeWindow className="!shadow-none border-slate-100 bg-slate-50 border-2 p-0 overflow-visible">
            <CubicBezier points={[0.65, 0, 0.35, 1]} />
        </NodeWindow>
    );
};
