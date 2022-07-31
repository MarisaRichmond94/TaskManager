import TasksApi from "api/tasks";

const handleUpdateTask = async (
  taskId: string,
  updateTaskDTO: UpdateTaskDTO,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  const updatedTask = await TasksApi.update(taskId, updateTaskDTO);
  onUpdateCallback(updatedTask);
};

export { handleUpdateTask };
