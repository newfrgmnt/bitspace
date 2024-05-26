import { NodeType } from '@bitspace/supabase/prisma';
import { Console } from './Console/Console';
import { Lerp } from './Lerp/Lerp';
import { Timer } from './Timer/Timer';
import { Oscillator } from './Oscillator/Oscillator';

export const UtilityNodes = [Console, Timer, Lerp, Oscillator].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type UtitltyNode = Console | Timer | Lerp | Oscillator;

export interface UtiliyNodeConstructor {
    new (): UtitltyNode;
    type: NodeType;
}
