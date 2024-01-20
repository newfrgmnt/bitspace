import {
    Fragment,
    Mix,
    Fractional,
    Minimum,
    Maximum,
    Absolute,
    Sign,
    Floor,
    Ceil,
    Smoothstep,
    Addition,
    Subtraction,
    Multiplication,
    Division,
    Modulo,
    Radians,
    Degrees,
    Sine,
    Arcsine,
    Cosine,
    Arccosine,
    Tangent,
    Arctangent,
    Exponentiation,
    Logarithm,
    Power,
    SquareRoot,
    InverseSquareRoot,
    Vector2,
    Vector3,
    Vector4
} from '@bitspace/webgl';

const CommonNodes = [Fragment, Mix, Fractional, Minimum, Maximum, Absolute, Sign, Floor, Ceil, Smoothstep];

const MathNodes = [Addition, Subtraction, Multiplication, Division, Modulo];

const TrigonometryNodes = [Radians, Degrees, Sine, Arcsine, Cosine, Arccosine, Tangent, Arctangent];

const ExponentialNodes = [Exponentiation, Logarithm, Power, SquareRoot, InverseSquareRoot];

const VectorNodes = [Vector2, Vector3, Vector4];

export const Nodes = [...CommonNodes, ...MathNodes, ...TrigonometryNodes, ...ExponentialNodes, ...VectorNodes];

export const NodeGroups = [
    {
        name: 'Common Nodes',
        nodes: CommonNodes
    },
    {
        name: 'Math Nodes',
        nodes: MathNodes
    },
    {
        name: 'Trigonometry Nodes',
        nodes: TrigonometryNodes
    },
    {
        name: 'Exponential Nodes',
        nodes: ExponentialNodes
    },
    {
        name: 'Vector Nodes',
        nodes: VectorNodes
    }
];
