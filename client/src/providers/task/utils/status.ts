import StatusesApi from 'api/statuses';

const statusUpdateHandler = async (
  taskToUpdate: Task,
  statusId: string,
  statusTypeId: string,
  onUpdateCallback: (updatedTask: Task) => void,
) => {
  taskToUpdate.status = await StatusesApi.update(statusId, { statusTypeId });
  onUpdateCallback(taskToUpdate);
};

export { statusUpdateHandler };
