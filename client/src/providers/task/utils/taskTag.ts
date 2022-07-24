import TaskTagsApi from "api/task_tags";

const handleCreateTaskTag = async(
  taskToUpdate: Task,
  createTaskTagDTO: CreateTaskTagDTO,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  const taskTag = await TaskTagsApi.post(createTaskTagDTO);
  taskToUpdate.tags.push(taskTag);
  onUpdateCallback(taskToUpdate);
};

const handleDeleteTaskTag = async(
  taskToUpdate: Task,
  taskTagIdToDelete: string,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  taskToUpdate.tags = taskToUpdate.tags.filter(x => x.id !== taskTagIdToDelete);
  onUpdateCallback(taskToUpdate);
  await TaskTagsApi.deleteById(taskTagIdToDelete);
};

export {
  handleCreateTaskTag,
  handleDeleteTaskTag,
};
