import { RequestHandler } from "express";

export type RequestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

export interface Route {
    callback: RequestHandler;
    method: RequestMethod;
    path: string;
    name: string;
    middleware: RequestHandler[];
}
