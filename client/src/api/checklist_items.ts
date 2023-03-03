import { makeApiRequest } from 'utils';
import { ApiMethod, ApiRoute } from 'enums';

const ROUTE = ApiRoute.checklistItems;

const create = async (
  body: CreateChecklistItemDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<ChecklistItem> => {
  const checklistItem = await makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.post, body });
  if (onUpdateCallback) {
    taskToUpdate.checklistItems.push(checklistItem);
    onUpdateCallback(taskToUpdate);
  }

  return checklistItem;
};

const update = async (
  id: string,
  body: UpdateChecklistItemDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate: Task,
  onUpdateCallback: (updatedTask: Task) => void,
): Promise<ChecklistItem> => {
  const checklistItemToUpdate = {
    ...taskToUpdate.checklistItems.find(x => x.id === id)
  };
  // optimistically update timestamp for immediate front-end updates; accuracy isn't important
  checklistItemToUpdate.updatedAt = Date.now();

  Object.keys(body).forEach(key => {
    const value = body[key];
    if (value !== undefined) checklistItemToUpdate[key] = value;
  });
  if (body.orderIndex !== undefined) {
    await makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.patch, id, body });
    const updatedTask = await makeApiRequest(
      getAccessTokenSilently,
      ApiRoute.tasks,
      { method: ApiMethod.getById, id: taskToUpdate.id },
    );
    onUpdateCallback(updatedTask);
  } else {
    taskToUpdate.checklistItems = taskToUpdate.checklistItems.map(
      x => x.id === id ? checklistItemToUpdate : x
    );
    onUpdateCallback(taskToUpdate);
    return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.patch, id, body });
  }
};

const deleteById = async (
  id: string,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<Boolean> => {
  if (onUpdateCallback) {
    taskToUpdate.checklistItems = taskToUpdate.checklistItems.filter(x => x.id !== id);
    onUpdateCallback(taskToUpdate);
  }
  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.deleteById, id });
};

export {
  create,
  deleteById,
  update,
};
