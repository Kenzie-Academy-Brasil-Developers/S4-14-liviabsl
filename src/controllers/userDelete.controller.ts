import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import { userDeleteService } from "../services/userDelete.service";

export const userDeleteController = async (req:Request, resp: Response) => {
    try {
        const id = req.params.id
        const deletedUser = await userDeleteService(id)
        return resp.status(204).json(deletedUser)
    } catch (error) {
        if( error instanceof AppError){
            handleError(error, resp)
        }
    }
}