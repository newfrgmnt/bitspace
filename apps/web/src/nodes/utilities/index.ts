import { Console } from './Console/Console';
import { Lerp } from './Lerp/Lerp';
import { Timer } from './Timer/Timer';

export const Utilities = [Console, Timer, Lerp].sort((a, b) => a.displayName.localeCompare(b.displayName));
