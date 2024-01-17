import { InputType, Arg } from 'type-graphql';
import { Input, Output } from '@prisma/client';

@InputType()
export class NodeCreateInput {
    id: string;
    name: string;
    inputs: Input[];
    outputs: Output[];
    createdAt: Date;
    updatedAt: Date;
}
