import { NodeType } from '../types';
import { AnalogousHarmony } from './AnalogousHarmony/AnalogousHarmony';
import { FromColor } from './FromColor/FromColor';
import { ComplementaryHarmony } from './ComplementaryHarmony/ComplementaryHarmony';
import { Gradient } from './Gradient/Gradient';
import { SquareHarmony } from './SquareHarmony/SquareHarmony';
import { TetradicHarmony } from './TetradicHarmony/TetradicHarmony';
import { TriadHarmony } from './TriadHarmony/TriadHarmony';
import { ToColor } from './ToColor/ToColor';

export const ColorNodes = [
    FromColor,
    ToColor,
    AnalogousHarmony,
    TriadHarmony,
    SquareHarmony,
    TetradicHarmony,
    ComplementaryHarmony,
    Gradient
].sort((a, b) => a.displayName.localeCompare(b.displayName));

export type ColorNode =
    | FromColor
    | ToColor
    | AnalogousHarmony
    | TriadHarmony
    | SquareHarmony
    | TetradicHarmony
    | ComplementaryHarmony
    | Gradient;

export interface ColorNodeConstructor {
    new (): ColorNode;
    type: NodeType;
}

export {
    FromColor,
    ToColor,
    AnalogousHarmony,
    TriadHarmony,
    SquareHarmony,
    TetradicHarmony,
    ComplementaryHarmony,
    Gradient
};
