import { NodeType } from '../types';
import { AnalogousHarmony } from './AnalogousHarmony/AnalogousHarmony';
import { ComplementaryHarmony } from './ComplementaryHarmony/ComplementaryHarmony';
import { FromHSV } from './FromHSV/FromHSV';
import { FromRGB } from './FromRGB/FromRGB';
import { Gradient } from './Gradient/Gradient';
import { SquareHarmony } from './SquareHarmony/SquareHarmony';
import { TetradicHarmony } from './TetradicHarmony/TetradicHarmony';
import { ToHSV } from './ToHSV/ToHSV';
import { TriadHarmony } from './TriadHarmony/TriadHarmony';

export const ColorNodes = [
    AnalogousHarmony,
    TriadHarmony,
    SquareHarmony,
    TetradicHarmony,
    ComplementaryHarmony,
    FromHSV,
    ToHSV,
    FromRGB,
    Gradient
].sort((a, b) => a.displayName.localeCompare(b.displayName));

export type ColorNode =
    | AnalogousHarmony
    | TriadHarmony
    | SquareHarmony
    | TetradicHarmony
    | ComplementaryHarmony
    | FromHSV
    | ToHSV
    | FromRGB
    | Gradient;

export interface ColorNodeConstructor {
    new (): ColorNode;
    type: NodeType;
}

export {
    AnalogousHarmony,
    TriadHarmony,
    SquareHarmony,
    TetradicHarmony,
    ComplementaryHarmony,
    FromHSV,
    ToHSV,
    FromRGB,
    Gradient
};
