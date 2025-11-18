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
    const { title, description, status, userID, dueDate } = req.body;
    if (!title || !description || !userID) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const task = new Task({
      title,
      description,
      status,
      userID,
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

// GET /api/v1/tasks - Get all tasks (with filters: status, search, sort, pagination)
// GET /api/v1/tasks/:id - Get single task
// POST /api/v1/tasks - Create new task
// PUT /api/v1/tasks/:id - Update existing task
// PATCH /api/v1/tasks/:id/complete - Mark task as completed
// DELETE /api/v1/tasks/:id - Delete task (optional)

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

    const { title, description, status, userID, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, userID, dueDate },
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
    return res
      .status(200)
      .json({
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
