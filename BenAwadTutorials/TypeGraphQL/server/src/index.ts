require('dotenv').config()
import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import express from 'express';
import { buildSchema } from "type-graphql";
import { DataSource } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";  
import cors from 'cors';

import { RegisterResolver } from './modules/user/Register';
import { redis } from './redis';
import { LoginResolver } from './modules/user/Login';
import { MeResolver } from './modules/user/Me';

let dataSource = new DataSource({
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port":  5432,
    "username": "postgres",
    "password": "password",
    "database" : "typegraphql-example",
    "synchronize": true,
    "logging": true,
    "entities": ["src/entity/*.*"]

})

const main = async () => {

    await dataSource.initialize()

    const schema = await buildSchema ({
        resolvers: [RegisterResolver, LoginResolver, MeResolver],
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: any) => ({ req }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground(),],
    })

    await apolloServer.start();

    const app = express();

    const RedisStore = connectRedis(session);

    app.use(cors({
        credentials: true,
        origin:"https://studio.apollographql.com"
    }));

    app.use(
        session({
            store: new RedisStore({
                client: redis as any,
            }),
            name: "qid",
            secret: process.env.REDIS_SECRET || "ahgsdkjfgasdfb4568656",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365,  //7years
            },
        })
    );

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql')
    })

}

main();