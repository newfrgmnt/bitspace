import {
    Absolute,
    Addition,
    Arccosine,
    Arcsine,
    Arctangent,
    Ceil,
    Cosine,
    Degrees,
    Division,
    Exponentiation,
    Floor,
    Fractional,
    Fragment,
    InverseSquareRoot,
    Logarithm,
    Maximum,
    Minimum,
    Mix,
    Modulo,
    Multiplication,
    Power,
    Radians,
    Sign,
    Sine,
    Smoothstep,
    SquareRoot,
    Subtraction,
    Tangent,
    Vector2,
    Vector3,
    Vector4
} from './nodes';

export * from './compiler/Compiler';

export * from './nodes';
export * from './schemas';

export * from '@thi.ng/shader-ast';
export * from '@thi.ng/shader-ast-glsl';

// WebGL
const WebGLCommonNodes = [Fragment, Mix, Fractional, Minimum, Maximum, Absolute, Sign, Floor, Ceil, Smoothstep];
const WebGLMathNodes = [Addition, Subtraction, Multiplication, Division, Modulo];
const WebGLTrigonometryNodes = [Radians, Degrees, Sine, Arcsine, Cosine, Arccosine, Tangent, Arctangent];
const WebGLExponentialNodes = [Exponentiation, Logarithm, Power, SquareRoot, InverseSquareRoot];
const WebGLVectorNodes = [Vector2, Vector3, Vector4];

export const WebGLNodes = [
    ...WebGLCommonNodes,
    ...WebGLMathNodes,
    ...WebGLTrigonometryNodes,
    ...WebGLExponentialNodes,
    ...WebGLVectorNodes
].sort((a, b) => a.displayName.localeCompare(b.displayName));

export type WebGLNode =
    | Absolute
    | Addition
    | Arccosine
    | Arcsine
    | Arctangent
    | Ceil
    | Cosine
    | Degrees
    | Division
    | Exponentiation
    | Floor
    | Fractional
    | Fragment
    | InverseSquareRoot
    | Logarithm
    | Maximum
    | Minimum
    | Mix
    | Modulo
    | Multiplication
    | Power
    | Radians
    | Sign
    | Sine
    | Smoothstep
    | SquareRoot
    | Subtraction
    | Tangent
    | Vector2
    | Vector3
    | Vector4;

export interface WebGLNodeConstructor {
    new (): WebGLNode;
}
