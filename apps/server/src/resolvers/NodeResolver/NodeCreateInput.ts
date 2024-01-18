import { InputType, Arg } from 'type-graphql';
import { Input, Output } from '@prisma/client';

@InputType()
export class NodeCreateInput {
    name: string;
    inputs: Input[];
    outputs: Output[];
    circuit?: string;
}
