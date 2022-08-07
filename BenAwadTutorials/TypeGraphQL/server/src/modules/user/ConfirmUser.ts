import { Arg, Mutation, Resolver } from "type-graphql";

import { User } from "../../entity/User";
import { redis } from "../../redis";



@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser(
        @Arg("token") token: string,
    ): Promise<boolean> {
        const userID = await redis.get(token);

        if (!userID) return false;

        User.update({id: parseInt(userID, 10)}, {confirmed: true})
        await redis.del(token)
        
        return true;
    }
}