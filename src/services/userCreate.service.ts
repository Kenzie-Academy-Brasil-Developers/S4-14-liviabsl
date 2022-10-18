import {v4 as uuidv4} from "uuid"
import AppDataSource from "../data-source";
import { User } from "../entities/user.entities";
import { IUser, IUserRequest } from "../interfaces/users";
import { hash } from 'bcrypt'


export const userCreateService = async ({name, email, password, isAdm}: IUserRequest) => {

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const emailAlreadyExists = users.find((user)=> user.email === email)

    if(emailAlreadyExists){
        throw new Error("Email already exists")
    }

    const passwordToString = password.toString()
    let hashedPassword = await hash(passwordToString,10)

    const user = new User()
    user.name = name
    user.email = email
    user.password = hashedPassword
    user.isAdm = isAdm

    userRepository.create(user)
    await userRepository.save(user)

    const returnedUser = (user:User) => {
        const {password, ...rest} = user
        return rest
    }
    return returnedUser(user)
    
}