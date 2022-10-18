import AppDataSource from "../data-source";
import { User } from "../entities/user.entities";
import { IUserUpdate } from "../interfaces/users";
import bcrypt from "bcrypt"
import { AppError } from "../errors/appError";

export const userUpdateService = async (data:IUserUpdate, id:string) => {
    const keys = Object.keys(data)
    const {password, email, name} = data
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({id})
    
    if(keys.includes("isAdm") || keys.includes("isActive") || keys.includes("id")){
        throw new AppError(401, "isAdm, id, isActive can't be modified")
    }

    if(!user){
        return ['User not found', 404]
    }


    await userRepository.update(user!.id,{
        password:password? await bcrypt.hash(password,10) : user.password,
        email: email? email : user.email,
        name: name? name : user.name,
        updatedAt: new Date()

    })

    const newUser = await userRepository.findOneBy({id})
    return newUser
}


    