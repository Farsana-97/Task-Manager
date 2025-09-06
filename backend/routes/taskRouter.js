import express from "express"
import { addTask, deleteTask, getMyTasks, updateTask } from "../controllers/taskController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const taskRouter = express.Router()

taskRouter.get("/",authMiddleware, getMyTasks)
taskRouter.post('/',authMiddleware, addTask)
taskRouter.patch('/:id',authMiddleware, updateTask)
taskRouter.delete('/:id',authMiddleware, deleteTask)


export default taskRouter;