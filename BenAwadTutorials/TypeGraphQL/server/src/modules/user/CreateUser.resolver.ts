import { User } from "../../entity/User";
import { Arg, ClassType, Mutation, Query, Resolver } from "type-graphql"
import { RegisterInput } from "./account/register/RegisterInput";

function createBaseResolver<T extends ClassType, X extends ClassType>(suffix: string, returnType: T, inputType: X) {
    @Resolver({isAbstract: true})
    abstract class BaseResolver {
        @Query(type => [objectTypeCls], { name: `getAll${suffix}`})
        async getAll(
            @Arg('first', type => Int) first: number,
        ): Promise<T[]> {
            return this.items.slice(0, first);
        }

        @Mutation(() => returnType, {name: `create${suffix}`})
        async createUser(
            @Arg('data') {data}: RegisterInput
        ) {
            return User.create(data).save()
        }
    }
}

@Resolver()
export class CreateUserResolver {
    @Mutation(() => User)
    async createUser(
        @Arg('data') {data}: RegisterInput
    ) {
        return User.create(data).save()
    }
}