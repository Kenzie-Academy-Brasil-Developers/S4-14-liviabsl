import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import { loginUserService } from "../services/loginUser.service";

export const loginUserController = async(req:Request, resp:Response) => {
    try {
        const data: IUserLogin = req.body
        const token = await loginUserService(data)
        return resp.status(200).json({token})
    } catch (error) {
        if(error instanceof Error){
            return resp.status(403).json({message: error.message})
        }
    }
}