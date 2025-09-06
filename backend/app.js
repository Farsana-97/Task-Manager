import express from "express"
import dotenv from "dotenv"
import connect from "./connectDb.js"
import cors from "cors"
import userRouter from "./routes/userRouter.js"
import taskRouter from "./routes/taskRouter.js"
import { errorHandler } from "./middlewares/errorHandler.js"


dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({origin:'https://task-manager-iota-eight-62.vercel.app'}))

app.use("/api/auth",userRouter)
app.use("/api/tasks",taskRouter)

connect();

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)

})