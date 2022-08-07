import { MyContext } from "../../types/MyContext";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";

export const isAuth: Middleware<MyContext> = async ({ context }, next) => {
    if (!context.req.session!.userID) {
        throw new Error("not authinticated");
    }

    return next()
} 