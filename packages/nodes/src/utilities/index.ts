import { NodeType } from '../types';
import { Console } from './Console/Console';
import { Lerp } from './Lerp/Lerp';
import { Timer } from './Timer/Timer';
import { Oscillator } from './Oscillator/Oscillator';

export const UtilityNodes = [Console, Timer, Lerp, Oscillator].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type UtilityNode = Console | Timer | Lerp | Oscillator;

export interface UtiliyNodeConstructor {
    new (): UtilityNode;
    type: NodeType;
}

export { Console, Timer, Lerp, Oscillator };
