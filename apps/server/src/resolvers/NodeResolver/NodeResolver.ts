import { Resolver, Query, Mutation, Authorized, Arg, Args } from 'type-graphql';
import { PrismaClient, Node } from '@prisma/client';
import { NodeCreateInput } from './NodeCreateInput';

@Resolver(Node)
export class NodeResolver {
    constructor(private prismaService: PrismaClient) {}

    @Query(returns => Node)
    async node(@Arg('id') id: string) {
        const node = await this.prismaService.node.findUnique({ where: { id } });

        if (!node) {
            throw new Error(`Node with identifier ${id} does not exist`);
        }

        return node;
    }
}
