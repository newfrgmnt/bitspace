import { NodeType } from '../types';
import { Webcam } from './Webcam/Webcam';
import { Gamepad } from './Gamepad/Gamepad';

export const InterfaceNodes = [Webcam, Gamepad].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
);

export type InterfaceNode = Webcam | Gamepad;

export interface InterfaceNodeConstructor {
    new (): InterfaceNode;
    type: NodeType;
}

export { Webcam, Gamepad };
