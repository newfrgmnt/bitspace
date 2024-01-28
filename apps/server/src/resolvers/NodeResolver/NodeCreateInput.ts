import { InputType, Arg } from 'type-graphql';

@InputType()
export class NodeCreateInput {
    name: string;
    circuit?: string;
}
