import { Resolver, Query, Mutation, Authorized, Arg, Args } from 'type-graphql';
import { User } from '../models/User';

@Resolver(User)
class UserResolver {
    constructor(private userService: UserService) {}

    @Query(returns => User)
    async user(@Arg('id') id: string) {
        const recipe = await this.userService.findById(id);

        if (!recipe) {
            throw new UserNotFoundError(id);
        }

        return recipe;
    }
}
