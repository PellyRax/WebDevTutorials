import { MyContext } from "../../types/MyContext";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";

export const logger: Middleware<MyContext> = async ({ args }, next) => {
    console.log(args)

    return next()
} 