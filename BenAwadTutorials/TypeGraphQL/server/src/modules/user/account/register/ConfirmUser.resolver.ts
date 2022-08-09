import { Arg, Mutation, Resolver } from "type-graphql";

import { User } from "../../../../entity/User";
import { redis } from "../../../../redis";
import { confirmUserPrefix } from "../../../constants/redisPrefixes";



@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser(
        @Arg("token") token: string,
    ): Promise<boolean> {
        const userID = await redis.get(confirmUserPrefix + token);

        if (!userID) return false;

        User.update({id: parseInt(userID, 10)}, {confirmed: true})
        await redis.del(confirmUserPrefix + token)
        
        return true;
    }
}