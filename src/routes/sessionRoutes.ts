import { Router } from "express";
import { loginUserController } from "../controllers/loginUser.controller";

export const session = Router()

session.post("/login", loginUserController)