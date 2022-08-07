import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from 'bcryptjs'

import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";



@Resolver()
export class LoginResolver {
    @Mutation(() => User, {nullable: true})
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email } })

        if (!user) return null;

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword) return null;    

        if(!user.confirmed) return null;

        ctx.req.session!.userID = user.id; 

        return user
    }
}