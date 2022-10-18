import { Response } from "express"
import AppDataSource from "../data-source"
import { User } from "../entities/user.entities"
import { AppError } from "../errors/appError"

export const userDeleteService = async (id:string) => {
    const userRepository = AppDataSource.getRepository(User)
    const deletedUser = await userRepository.findOneBy({id})
    
    if(!deletedUser){
        throw new AppError(404, "invalid id")
    }

    if(!deletedUser.isActive){
        throw new AppError(400, "User already deleted")
    }
    
    await userRepository.update(id, {
        isActive:false
    })
}