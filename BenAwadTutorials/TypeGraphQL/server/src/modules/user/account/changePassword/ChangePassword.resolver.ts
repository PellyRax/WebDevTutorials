import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from 'bcryptjs';

import { User } from "../../../../entity/User";
import { redis } from "../../../../redis";
import { forgotPasswordPrefix } from "../../../constants/redisPrefixes";
import { ChangePasswordInput } from "./ChangePasswordInput";
import { MyContext } from "src/types/MyContext";



@Resolver()
export class changePasswordResolver {
    @Mutation(() => User, {nullable: true})
    async changePassword(
        @Arg("data") {token, password}: ChangePasswordInput,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const userID = await redis.get(forgotPasswordPrefix + token) || null;

        if (!userID) return null;

        const user = await User.findOne({where: {id:parseInt(userID, 10)}});

        if (!user) return null;

        await redis.del(forgotPasswordPrefix + token);

        user.password = await bcrypt.hash(password, 12);

        await user.save();

        ctx.req.session!.userID = user.id

        return user;
    }
}