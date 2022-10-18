import { Router } from "express";
import { userCreateController } from "../controllers/userCreate.controller";
import { userDeleteController } from "../controllers/userDelete.controller";
import { userListController } from "../controllers/userList.controller";
import { userUpdateController } from "../controllers/userUpdate.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsOwnerOrAdm } from "../middlewares/ensureIsOwnerOrAdm.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

export const userRouter = Router()

userRouter.post("/users", userCreateController)
userRouter.get("/users", ensureAuthMiddleware, isAdmMiddleware, userListController)
userRouter.patch("/users/:id", ensureAuthMiddleware, ensureIsOwnerOrAdm, userUpdateController)
userRouter.delete("/users/:id", ensureAuthMiddleware, isAdmMiddleware, userDeleteController)