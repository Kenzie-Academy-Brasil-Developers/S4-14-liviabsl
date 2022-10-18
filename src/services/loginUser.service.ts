import AppDataSource from "../data-source";
import { User } from "../entities/user.entities";
import { IUserLogin } from "../interfaces/users";
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginUserService = async ({email, password}: IUserLogin): Promise<string> => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        email:email
    })

    if(!user){
        throw new Error("Invalid user or password")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        throw new Error("Invalid user or password")
    }

    const token = jwt.sign({
        isAdm: user.isAdm
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: '24h',
        subject: user.id
    }
    )

    return token
}