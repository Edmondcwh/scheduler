import "reflect-metadata";
import { createConnection } from "typeorm";
import { Fypgroup } from "./entities/Fypgroup";
import { Professor } from "./entities/Professor";
import { User } from "./entities/User";
import express from "express";
import {ApolloServer} from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __prod__ } from "./constants";
import cors from 'cors';
import { ProfessorResolver } from "./resolvers/professor";
import { FypgroupResolver } from "./resolvers/fypgroup";
import { Project } from "./entities/Project";
import { ProjectResolver } from "./resolvers/project";




const main = async () => {
    const orm = await createConnection({
        entities: [Fypgroup, Professor, User, Project],
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "password",
        database: "lireddit2",
        synchronize: true,
        logging: true

    })

    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();
    app.use(cors({origin: "http://localhost:3000", credentials: true}));
    
    app.use(session({
        name: "qid",
        store: new RedisStore({client: redisClient, disableTouch: true}),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: __prod__,
            sameSite: 'lax',
        },
        saveUninitialized: false,
        secret: "sdagdsua",
        resave: false,
    }))


    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, UserResolver, ProfessorResolver, FypgroupResolver, ProjectResolver],
            validate: false

        }),
        context: ({req,res}) => ({em: orm.manager, req,res})
    })
    apolloServer.applyMiddleware({app, cors: false})

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })


    // let fypgroup = new Fypgroup();
    // fypgroup.name = "fyp0001"
    // fypgroup.students = ["Tom", 'Mary'];

    // orm.manager.insert(Fypgroup, fypgroup).then(fypgroup => (console.log("success inserting fypgroup: ", fypgroup.generatedMaps)));
}

main().catch((err) => {
    console.error(err);
})