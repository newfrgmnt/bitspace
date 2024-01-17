import { Resolver, Query, Mutation, Authorized, Arg, Args } from 'type-graphql';
import { PrismaClient, Node } from '@prisma/client';
import { NodeCreateInput } from './NodeCreateInput';

@Resolver(Node)
class NodeResolver {
    constructor(private prismaService: PrismaClient) {}

    @Query(returns => Node)
    async node(@Arg('id') id: string) {
        const recipe = await this.prismaService.node.findUnique({ where: { id } });

        if (!recipe) {
            throw new NodeNotFoundError(id);
        }

        return recipe;
    }

    @Mutation(returns => Node)
    async createNode(@Arg('data') data: NodeCreateInput) {
        return this.prismaService.node.create({ data });
    }
}
