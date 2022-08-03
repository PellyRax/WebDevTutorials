import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import Express from 'express';
import { buildSchema } from "type-graphql";
import { DataSource } from 'typeorm';

import { RegisterResolver } from './modules/user/Register';

let dataSource = new DataSource({
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
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
        resolvers: [RegisterResolver],
    });


    const apolloServer = new ApolloServer({schema})

    await apolloServer.start();

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql')
    })

}

main();