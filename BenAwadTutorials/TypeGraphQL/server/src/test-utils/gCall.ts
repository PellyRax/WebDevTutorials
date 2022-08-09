import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../utils/createSchema";
import { Maybe } from "type-graphql";

interface Options {
    source: string;
    variableValues?: Maybe<{[key: string]: any;}>;
    userID?: number;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues, userID}: Options) => {
    if (!schema){
        schema = await createSchema();
    }
    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req:{
                session: {
                    userID
                }
            },
            res:{
                clearCookie: jest.fn()
            }
        }
    })
}