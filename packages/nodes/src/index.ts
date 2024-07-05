import { MathNode, MathNodeConstructor, MathNodes } from './math';
import { EasingNode, EasingNodeConstructor, EasingNodes } from './easings';
import { UtilityNodes, UtiliyNodeConstructor, UtilityNode } from './utilities';
import { ColorNode, ColorNodeConstructor, ColorNodes } from './color';
import { AINode, AINodeConstructor, AINodes } from './ai';
import {
    PrimitiveNodeConstructor,
    PrimitiveNodes,
    PrimitiveNode
} from './primitives';
import { CircuitNodes, CircuitNodeConstructor, CircuitNode } from './circuit';
import {
    InterfaceNode,
    InterfaceNodeConstructor,
    InterfaceNodes
} from './interface';

export * from './math';
export * from './easings';
export * from './utilities';
export * from './color';
export * from './ai';
export * from './primitives';
export * from './interface';

export * from './types';

export type Nodes =
    | InterfaceNode
    | PrimitiveNode
    | AINode
    | ColorNode
    | EasingNode
    | MathNode
    | UtilityNode
    | CircuitNode;

export type NodeConstructor =
    | InterfaceNodeConstructor
    | PrimitiveNodeConstructor
    | AINodeConstructor
    | ColorNodeConstructor
    | EasingNodeConstructor
    | MathNodeConstructor
    | UtiliyNodeConstructor
    | CircuitNodeConstructor;

// Node Groups
export const NodeGroups = [
    {
        name: 'Primitives',
        nodes: PrimitiveNodes
    },
    {
        name: 'Math',
        nodes: MathNodes
    },
    {
        name: 'Interface',
        nodes: InterfaceNodes
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
        name: 'Artificial Intelligence',
        nodes: AINodes
    },
    {
        name: 'Utility',
        nodes: UtilityNodes
    },
    {
        name: 'Circuit',
        nodes: CircuitNodes
    }
] as const;

export const NodeConstructors: NodeConstructor[] = [
    ...InterfaceNodes,
    ...PrimitiveNodes,
    ...AINodes,
    ...MathNodes,
    ...EasingNodes,
    ...ColorNodes,
    ...UtilityNodes,
    ...CircuitNodes
];
