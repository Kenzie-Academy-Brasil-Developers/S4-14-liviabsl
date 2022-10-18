import { NextFunction, Request, Response } from "express";
import { userCreateController } from "../controllers/userCreate.controller";

export const ensureIsOwnerOrAdm = (req:Request, resp:Response, next:NextFunction) => {
    const {id} = req.params

    if(id !== req.user.id && req.user.isAdm == false){
        return resp.status(401).json({
            message:"user is not adm or owner"
        })
    }
    return next()
}