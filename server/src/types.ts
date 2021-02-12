import { EntityManager } from "typeorm/entity-manager/EntityManager";
import {Request, Response} from 'express';
export type MyContext = {
    em: EntityManager,
    req: Request,
    res: Response
}

export {};

declare module "express-session" {
    interface SessionData {
        userId: number
    }
}