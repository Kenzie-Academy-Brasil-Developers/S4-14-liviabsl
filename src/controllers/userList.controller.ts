import { Request, Response } from "express";
import { userListService } from "../services/userList.service";

export const userListController = async (req: Request, resp: Response) =>{
    try {
        const users = await userListService()
        return resp.send(users)
    } catch (err) {
        if (err instanceof Error){
            return resp.status(400).send({
                error: err.name,
                message: err.message
            })
        }
    }
}