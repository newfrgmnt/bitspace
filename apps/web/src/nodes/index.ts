// import { WebGLNodeConstructor, WebGLNodes } from '@bitspace/webgl';
import { MathNodeConstructor, MathNodes } from './math';
import { EasingNodeConstructor, EasingNodes } from './easings';
import { UtilityNodes, UtiliyNodeConstructor } from './utilities';
import { ColorNodeConstructor, ColorNodes } from './color';
import { AINodeConstructor, AINodes } from './ai';
import { ThreeDNodeConstructor, ThreeDNodes } from './3d';
import { PrimitiveNodeConstructor, PrimitiveNodes } from './primitives';

export type NodeConstructor =
    | PrimitiveNodeConstructor
    | AINodeConstructor
    | ColorNodeConstructor
    | EasingNodeConstructor
    | MathNodeConstructor
    | ThreeDNodeConstructor
    | UtiliyNodeConstructor;

// Node Groups
export const NodeGroups = [
    {
        name: 'Primitives',
        nodes: PrimitiveNodes
    },
    {
        name: 'Artificial Intelligence',
        nodes: AINodes
    },
    {
        name: 'Math',
        nodes: MathNodes
    },
    {
        name: '3D',
        nodes: ThreeDNodes
    },
    {
        name: 'Easing',
        nodes: EasingNodes
    },
    {
        name: 'Color',
        nodes: ColorNodes
    },
    {
        name: 'Utility',
        nodes: UtilityNodes
    }
] as const;

export const NodeConstructors: NodeConstructor[] = [
    ...PrimitiveNodes,
    ...AINodes,
    ...ThreeDNodes,
    ...MathNodes,
    ...EasingNodes,
    ...ColorNodes,
    ...UtilityNodes
];
