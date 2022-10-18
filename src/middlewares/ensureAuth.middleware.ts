import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { userCreateController } from "../controllers/userCreate.controller";

export const ensureAuthMiddleware = (req:Request, resp:Response, next:NextFunction) => {
    let token = req.headers.authorization
    
    if(!token){
        return resp.status(401).json({
            message: 'Missing token'
        })
    }

    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded:any) => {
        if(error){
            return resp.status(401).json({
                message: 'Invalid token'
            })
        }

            req.user = {
                isAdm: decoded.isAdm,
                id: decoded.sub
            }
        
        return next()
    })
}