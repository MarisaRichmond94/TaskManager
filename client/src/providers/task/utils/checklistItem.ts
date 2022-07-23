import ChecklistItemsApi from "api/checklistItems";
import TasksApi from "api/tasks";

const handleCreateChecklistItem = async (
  taskToUpdate: Task,
  createChecklistItemDTO: CreateChecklistItemDTO,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  const newChecklistItem = await ChecklistItemsApi.post(createChecklistItemDTO);
  taskToUpdate.checklistItems.push(newChecklistItem);
  onUpdateCallback(taskToUpdate);
};

const handleUpdateChecklistItem = async (
  taskToUpdate: Task,
  checklistItemId: string,
  updateChecklistItemDTO: UpdateChecklistItemDTO,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  const checklistItemToUpdate = {
    ...taskToUpdate.checklistItems.find(x => x.id === checklistItemId)
  };
  Object.keys(updateChecklistItemDTO).forEach(key => {
    const value = updateChecklistItemDTO[key];
    if (value !== undefined) checklistItemToUpdate[key] = value;
  });
  if (updateChecklistItemDTO.orderIndex !== undefined) {
    await ChecklistItemsApi.update(checklistItemToUpdate.id, updateChecklistItemDTO);
    const updatedTask = await TasksApi.getById(taskToUpdate.id);
    onUpdateCallback(updatedTask);
  } else {
    taskToUpdate.checklistItems = taskToUpdate.checklistItems.map(
      x => x.id === checklistItemId ? checklistItemToUpdate : x
    );
    onUpdateCallback(taskToUpdate);
    await ChecklistItemsApi.update(checklistItemToUpdate.id, updateChecklistItemDTO);
  }
};

const handleDeleteChecklistItem = async (
  taskToUpdate: Task,
  checklistItemId: string,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  taskToUpdate.checklistItems = taskToUpdate.checklistItems.filter(x => x.id !== checklistItemId);
  onUpdateCallback(taskToUpdate);
  await ChecklistItemsApi.deleteById(checklistItemId);
};

export {
  handleCreateChecklistItem,
  handleUpdateChecklistItem,
  handleDeleteChecklistItem,
};
