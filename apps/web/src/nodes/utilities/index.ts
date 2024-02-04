import { NodeType } from '@prisma/client';
import { Console } from './Console/Console';
import { Lerp } from './Lerp/Lerp';
import { Timer } from './Timer/Timer';

export const UtilityNodes = [Console, Timer, Lerp].sort((a, b) => a.displayName.localeCompare(b.displayName));

export type UtitltyNode = Console | Timer | Lerp;

export interface UtiliyNodeConstructor {
    new (): UtitltyNode;
    type: NodeType;
}
