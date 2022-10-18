import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import { IUserUpdate } from "../interfaces/users";
import { userUpdateService } from "../services/userUpdate.service";

export const userUpdateController = async (req:Request, resp:Response) => {
    const data:IUserUpdate = req.body
    const {id} = req.params
    try {
        const userUpdated = await userUpdateService(data, id)
        return resp.status(200).json({message:userUpdated})

    } catch (error) {
        if( error instanceof AppError){
            handleError(error, resp)
        }
    }

}