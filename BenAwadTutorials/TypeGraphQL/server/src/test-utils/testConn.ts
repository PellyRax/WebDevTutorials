import { DataSource } from 'typeorm';

export const testConn = (drop: boolean = false) => {
    const ds = new DataSource({
        "name": "default",
        "type": "postgres",
        "host": "localhost",
        "port":  5432,
        "username": "postgres",
        "password": "password",
        "database" : "typegraphql-example-test",
        "synchronize": drop,
        "dropSchema": drop,
        "entities": [__dirname + "/../entity/*.*"]
    
    }).initialize()

    return ds
}