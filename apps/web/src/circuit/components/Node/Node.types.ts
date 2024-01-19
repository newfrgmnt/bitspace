import { Input, Node, Output } from '@bitspace/circuit';
import { DraggableProps } from 'react-draggable';

export type NodeProps = {
    node: Node;
    window?: JSX.Element;
    actions?: NodeActionProps[];
    className?: string;
    disabled?: boolean;
} & Partial<DraggableProps>;

export type NodeActionProps = {
    color?: string;
    onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
};

export type NodePortsProps = {
    ports: Input<unknown>[] | Output<unknown>[];
    isOutputWrapper?: boolean;
};
