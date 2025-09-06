import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['todo','in-progress','completed'],
        default:'todo'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const taskModel = mongoose.model("Task",taskSchema)

export default taskModel;