// import { WebGLNodeConstructor, WebGLNodes } from '@bitspace/webgl';
import { MathNodeConstructor, MathNodes } from './math';
import { EasingNodeConstructor, EasingNodes } from './easings';
import { UtilityNodes, UtiliyNodeConstructor } from './utilities';
import { ColorNodeConstructor, ColorNodes } from './color';
import { AINodeConstructor, AINodes } from './ai';

export type NodeConstructor =
    | AINodeConstructor
    | ColorNodeConstructor
    | EasingNodeConstructor
    | MathNodeConstructor
    | UtiliyNodeConstructor;

// Node Groups
export const NodeGroups = [
    {
        name: 'Artificial Intelligence',
        nodes: AINodes
    },
    {
        name: 'Math',
        nodes: MathNodes
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
    ...AINodes,
    ...MathNodes,
    ...EasingNodes,
    ...ColorNodes,
    ...UtilityNodes
];
