import { NodeType } from '@prisma/client';
import { AnalogousHarmony } from './AnalogousHarmony/AnalogousHarmony';
import { ComplementaryHarmony } from './ComplementaryHarmony/ComplementaryHarmony';
import { FromHSV } from './FromHSV/FromHSV';
import { FromRGB } from './FromRGB/FromRGB';
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
    FromRGB
].sort((a, b) => a.displayName.localeCompare(b.displayName));

export type ColorNode =
    | AnalogousHarmony
    | TriadHarmony
    | SquareHarmony
    | TetradicHarmony
    | ComplementaryHarmony
    | FromHSV
    | ToHSV
    | FromRGB;

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
    FromRGB
};
