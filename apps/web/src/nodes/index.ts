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
import { AnalogousHarmony } from './AnalogousHarmony/AnalogousHarmony';
import { TriadHarmony } from './TriadHarmony/TriadHarmony';
import { HSV } from './HSV/HSV';
import { HSVRGB } from './HSVRGB/HSVRGB';
import { RGB } from './RGB/RGB';
import { SquareHarmony } from './SquareHarmony/SquareHarmony';
import { TetradicHarmony } from './TetradicHarmony/TetradicHarmony';
import { ComplementaryHarmony } from './ComplementaryHarmony/ComplementaryHarmony';
import { Image } from './Image/Image';
import { Prompt } from './Prompt/Prompt';
import { Console } from './Console/Console';

// WebGL
const CommonNodes = [Fragment, Mix, Fractional, Minimum, Maximum, Absolute, Sign, Floor, Ceil, Smoothstep];
const MathNodes = [Addition, Subtraction, Multiplication, Division, Modulo];
const TrigonometryNodes = [Radians, Degrees, Sine, Arcsine, Cosine, Arccosine, Tangent, Arctangent];
const ExponentialNodes = [Exponentiation, Logarithm, Power, SquareRoot, InverseSquareRoot];
const VectorNodes = [Vector2, Vector3, Vector4];

export const WebGLNodes = [
    ...CommonNodes,
    ...MathNodes,
    ...TrigonometryNodes,
    ...ExponentialNodes,
    ...VectorNodes
].sort((a, b) => a.name.localeCompare(b.displayName));

// Color
export const ColorNodes = [
    AnalogousHarmony,
    TriadHarmony,
    SquareHarmony,
    TetradicHarmony,
    ComplementaryHarmony,
    HSV,
    HSVRGB,
    RGB
].sort((a, b) => a.name.localeCompare(b.displayName));

// AI
export const AINodes = [Image, Prompt].sort((a, b) => a.name.localeCompare(b.displayName));

// Utilities
export const Utilities = [Console].sort((a, b) => a.name.localeCompare(b.displayName));

// Node Groups
export const NodeGroups = [
    {
        name: 'Artificial Intelligence',
        nodes: AINodes
    },
    {
        name: 'Color Nodes',
        nodes: ColorNodes
    },
    {
        name: 'WebGL Nodes',
        nodes: WebGLNodes
    },
    {
        name: 'Utility Nodes',
        nodes: Utilities
    }
];
