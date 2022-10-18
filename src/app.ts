import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import { userRouter } from "./routes/routes"
import { session } from "./routes/sessionRoutes"
import { AppError } from "./errors/appError"



const app = express()
app.use(express.json())

app.use(userRouter)
app.use(session)

app.get("/", (req: Request, resp: Response) => {
    return resp.json({
      message: "Hello World Kenzie",
    });
  });

app.use((err:Error, req:Request, resp:Response, next:NextFunction)=>{
  if(err instanceof AppError){
    return resp.status(err.statuscode).json({
      status:"error",
      message: err.message
    })
  }

  console.log(err)

  return resp.status(500).json({
    status:"error",
    message:"Internal server error"
  })
})


export default app