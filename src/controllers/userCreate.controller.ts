import { Request, Response } from "express";
import { userCreateService } from "../services/userCreate.service";

export const userCreateController = async (req: Request, resp: Response) =>{
    try {
        const {name, email, password, isAdm} = req.body
        const newUser = await userCreateService({name, email, password, isAdm})
        return resp.status(201).send(newUser)
    } catch (err) {
        if (err instanceof Error){
            return resp.status(400).send({
                error: err.name,
                message: err.message
            })
        }
    }
}