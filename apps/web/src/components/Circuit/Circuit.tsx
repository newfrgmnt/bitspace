import { PropsWithChildren } from 'react';
import { CircuitCanvas } from './CircuitCanvas';

export interface CircuitProps extends PropsWithChildren {}

export const Circuit = ({ children }: CircuitProps) => {
    return (
        <div>
            <CircuitCanvas>{children}</CircuitCanvas>
        </div>
    );
};
