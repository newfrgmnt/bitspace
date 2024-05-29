import { MathNode, MathNodeConstructor, MathNodes } from './math';
import { EasingNode, EasingNodeConstructor, EasingNodes } from './easings';
import { UtilityNodes, UtiliyNodeConstructor, UtilityNode } from './utilities';
import { ColorNode, ColorNodeConstructor, ColorNodes } from './color';
import { AINode, AINodeConstructor, AINodes } from './ai';
import { ThreeDNode, ThreeDNodeConstructor, ThreeDNodes } from './3d';
import {
    PrimitiveNodeConstructor,
    PrimitiveNodes,
    PrimitiveNode
} from './primitives';

export * from './math';
export * from './easings';
export * from './utilities';
export * from './color';
export * from './ai';
export * from './3d';
export * from './primitives';

export * from './types';

export type Nodes =
    | PrimitiveNode
    | AINode
    | ColorNode
    | EasingNode
    | MathNode
    | ThreeDNode
    | UtilityNode;

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
