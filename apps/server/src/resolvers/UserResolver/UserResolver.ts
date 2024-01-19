import { Resolver, Query, Mutation, Authorized, Arg, Args } from 'type-graphql';
import { User } from '../../models/User';
import {} from '@prisma/client';

@Resolver(User)
class UserResolver {}
