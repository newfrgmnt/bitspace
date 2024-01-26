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
    Sine as WebGLSine,
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
import { Image } from './ai/Image/Image';
import { Prompt } from './ai/Prompt/Prompt';
import { Console } from './utilities/Console/Console';
import { Timer } from './utilities/Timer/Timer';
import { AnalogousHarmony } from './color/AnalogousHarmony/AnalogousHarmony';
import { TriadHarmony } from './color/TriadHarmony/TriadHarmony';
import { SquareHarmony } from './color/SquareHarmony/SquareHarmony';
import { TetradicHarmony } from './color/TetradicHarmony/TetradicHarmony';
import { ComplementaryHarmony } from './color/ComplementaryHarmony/ComplementaryHarmony';
import { HSV } from './color/HSV/HSV';
import { ToHSV } from './color/ToHSV/ToHSV';
import { HSVRGB } from './color/HSVRGB/HSVRGB';
import { RGB } from './color/RGB/RGB';
import { MathNodes } from './math';
import { CubicBezier } from './easings/CubicBezier/CubicBezier';
import { EasingNodes } from './easings';
import { Utilities } from './utilities';

// WebGL
const WebGLCommonNodes = [Fragment, Mix, Fractional, Minimum, Maximum, Absolute, Sign, Floor, Ceil, Smoothstep];
const WebGLMathNodes = [Addition, Subtraction, Multiplication, Division, Modulo];
const WebGLTrigonometryNodes = [Radians, Degrees, WebGLSine, Arcsine, Cosine, Arccosine, Tangent, Arctangent];
const WebGLExponentialNodes = [Exponentiation, Logarithm, Power, SquareRoot, InverseSquareRoot];
const WebGLVectorNodes = [Vector2, Vector3, Vector4];

export const WebGLNodes = [
    ...WebGLCommonNodes,
    ...WebGLMathNodes,
    ...WebGLTrigonometryNodes,
    ...WebGLExponentialNodes,
    ...WebGLVectorNodes
].sort((a, b) => a.displayName.localeCompare(b.displayName));

// Color
export const ColorNodes = [
    AnalogousHarmony,
    TriadHarmony,
    SquareHarmony,
    TetradicHarmony,
    ComplementaryHarmony,
    HSV,
    ToHSV,
    HSVRGB,
    RGB
].sort((a, b) => a.displayName.localeCompare(b.displayName));

// AI
export const AINodes = [Image, Prompt].sort((a, b) => a.displayName.localeCompare(b.displayName));

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
        name: 'WebGL',
        nodes: WebGLNodes
    },
    {
        name: 'Utility',
        nodes: Utilities
    }
];
