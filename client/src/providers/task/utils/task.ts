import TasksApi from "api/tasks";

const handleUpdateTask = async (
  taskToUpdate: Task,
  updateTaskDTO: UpdateTaskDTO,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  Object.keys(updateTaskDTO).forEach(key => {
    const value = updateTaskDTO[key];
    if (value !== undefined) taskToUpdate[key] = value;
  });
  onUpdateCallback(taskToUpdate);
  await TasksApi.update(taskToUpdate.id, updateTaskDTO);
};

export { handleUpdateTask };
