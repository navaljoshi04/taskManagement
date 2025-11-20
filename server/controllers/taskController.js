import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({ message: "Success", tasks: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching tasks", error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title || !description) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const checkIfTaskIsDuplicate = await Task.findOne({
      title,
      description,
    });
    if (checkIfTaskIsDuplicate) {
      return res.status(409).json({
        message: "Task already exists — duplicate task not allowed",
        task: checkIfTaskIsDuplicate,
      });
    }
    const task = new Task({
      title,
      description,
      status,
      dueDate,
    });

    await task.save();
    return res
      .status(201)
      .json({ message: "Successfully created the task", task: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while creating tasks", error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    return res
      .status(200)
      .json({ message: "succuessfully fetched the task", task: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting task", error: error.message });
  }
};

export const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, status, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, dueDate },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    return res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    return res.status(500).json({
      message: "Error while updating task",
      error: error.message,
    });
  }
};

export const changeStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedStatus = await Task.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    if (!updatedStatus) {
      return res.status(404).json({
        message: "Task can't be found so unable to change the status",
      });
    }
    return res.status(200).json({
      message: "Task status updated successfully",
      status: updatedStatus,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while updating task",
      error: error.message,
    });
  }
};
