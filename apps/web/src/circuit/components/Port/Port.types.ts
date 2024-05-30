import { Input, Output } from '@bitspace/circuit';

export type PortProps<T> = {
    port: Input<T> | Output<T>;
    isOutput: boolean;
    windowActive: boolean;
};
