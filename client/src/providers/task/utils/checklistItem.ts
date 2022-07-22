import ChecklistItemsApi from "api/checklistItems";

const checklistItemUpdateHandler = async (
  taskToUpdate: Task,
  checklistItemId: string,
  updateChecklistItemDTO: UpdateChecklistItemDTO,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  const checklistItemToUpdate = { ...taskToUpdate.checklistItems.find(x => x.id === checklistItemId) };
  Object.keys(updateChecklistItemDTO).forEach(key => {
    const value = updateChecklistItemDTO[key];
    if (value !== undefined) checklistItemToUpdate[key] = value;
  });
  taskToUpdate.checklistItems = taskToUpdate.checklistItems.map(
    x => x.id === checklistItemId ? checklistItemToUpdate : x
  );
  onUpdateCallback(taskToUpdate);
  await ChecklistItemsApi.update(checklistItemToUpdate.id, updateChecklistItemDTO);
};

export { checklistItemUpdateHandler };
