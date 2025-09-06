import taskModel from "../models/taskModel.js";


export const addTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    if (!title || !description) {
      return res.json({ error: "Some fields are empty" });
    }

    const newTask = await taskModel.create({
      title,
      description,
      status,
      user: req.user.id,
    });
    console.log(res)
    return res.json({ message: "New Task Added", task: newTask });
  } catch (error) {
    res.json({ error: error.message });
  }
};



export const getMyTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.json({ error: error.message });
  }
};


export const updateTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const deleteTask = async (req, res) => {
  const id = req.params.id;
  const result = await taskModel.findByIdAndDelete(id);
  res.json({ message: "Task deleted" });
};