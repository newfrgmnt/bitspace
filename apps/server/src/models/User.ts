import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
    @Field(type => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    avatarUrl: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
