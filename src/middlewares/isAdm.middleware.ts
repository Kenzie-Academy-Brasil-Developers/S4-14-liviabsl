import { NextFunction, Request, Response } from "express";

export const isAdmMiddleware = (req:Request, resp:Response, next:NextFunction) => {
    if(req.user.isAdm==false){
        return resp.status(403).json({
            message:"user is not adm"
        })
    }
    return next()
}