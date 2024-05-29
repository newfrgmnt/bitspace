import { NodeType } from '../types';
import { Absolute } from './Absolute/Absolute';
import { Addition } from './Addition/Addition';
import { Ceil } from './Ceil/Ceil';
import { Cosine } from './Cosine/Cosine';
import { Division } from './Division/Division';
import { Floor } from './Floor/Floor';
import { Logarithm } from './Logarithm/Logarithm';
import { Logarithm2 } from './Logarithm2/Logarithm2';
import { Max } from './Max/Max';
import { Min } from './Min/Min';
import { Modulo } from './Modulo/Modulo';
import { Multiplication } from './Multiplication/Multiplication';
import { Power } from './Power/Power';
import { Round } from './Round/Round';
import { Sign } from './Sign/Sign';
import { Sine } from './Sine/Sine';
import { SquareRoot } from './SquareRoot/SquareRoot';
import { Subtraction } from './Subtraction/Subtraction';

export const MathNodes = [
    Absolute,
    Addition,
    Ceil,
    Cosine,
    Division,
    Floor,
    Logarithm,
    Logarithm2,
    Max,
    Min,
    Modulo,
    Multiplication,
    Power,
    Round,
    Sign,
    Sine,
    SquareRoot,
    Subtraction
].sort((a, b) => a.displayName.localeCompare(b.displayName));

export type MathNode =
    | Absolute
    | Addition
    | Ceil
    | Cosine
    | Division
    | Floor
    | Logarithm
    | Logarithm2
    | Max
    | Min
    | Modulo
    | Multiplication
    | Power
    | Round
    | Sign
    | Sine
    | SquareRoot
    | Subtraction;

export interface MathNodeConstructor {
    new (): MathNode;
    type: NodeType;
}

export {
    Absolute,
    Addition,
    Ceil,
    Cosine,
    Division,
    Floor,
    Logarithm,
    Logarithm2,
    Max,
    Min,
    Modulo,
    Multiplication,
    Power,
    Round,
    Sign,
    Sine,
    SquareRoot,
    Subtraction
};
