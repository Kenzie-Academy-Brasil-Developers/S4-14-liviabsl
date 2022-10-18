import { Response } from "express"

export class AppError extends Error{
    statuscode

    constructor(statuscode:number, message:string){
        super()
        this.statuscode = statuscode,
        this.message = message
    }
}

export const handleError = (err:AppError, res:Response) => {
    const {statuscode, message} = err
    return res.status(statuscode).json({
        status:"error",
        statuscode,
        message
    })
}