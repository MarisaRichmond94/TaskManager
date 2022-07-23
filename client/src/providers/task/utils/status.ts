import StatusesApi from 'api/statuses';

const handleUpdateStatus = async (
  taskToUpdate: Task,
  statusId: string,
  statusTypeId: string,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  taskToUpdate.status = await StatusesApi.update(statusId, { statusTypeId });
  onUpdateCallback(taskToUpdate);
};

export { handleUpdateStatus };
