import { Connection, Output } from '@bitspace/circuit';

export type ConnectionTargetPoint = {
    x: number;
    y: number;
};

export type ConnectionProps<T> = {
    output?: Output<T>;
    point?: ConnectionTargetPoint;
    connection?: Connection<T>;
};
