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

// Nodes
export * from './Absolute/Absolute';
export * from './Addition/Addition';
export * from './Ceil/Ceil';
export * from './Cosine/Cosine';
export * from './Division/Division';
export * from './Floor/Floor';
export * from './Logarithm/Logarithm';
export * from './Logarithm2/Logarithm2';
export * from './Max/Max';
export * from './Min/Min';
export * from './Modulo/Modulo';
export * from './Multiplication/Multiplication';
export * from './Power/Power';
export * from './Round/Round';
export * from './Sign/Sign';
export * from './Sine/Sine';
export * from './SquareRoot/SquareRoot';
export * from './Subtraction/Subtraction';

// Schemas
export * from '../../schemas/NumberSchema';

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
