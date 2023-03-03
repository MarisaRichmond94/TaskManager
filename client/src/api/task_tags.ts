import { makeApiRequest } from 'utils';
import { ApiMethod, ApiRoute } from 'enums';

const ROUTE = ApiRoute.taskTags;

const create = async(
  body: CreateTaskTagDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
) => {
  const taskTag = await makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.post, body });
  if (onUpdateCallback) {
    taskToUpdate.tags.push(taskTag);
    onUpdateCallback(taskToUpdate);
  }

  return taskTag;
};

const deleteById = async(
  id: string,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<boolean> => {
  if (onUpdateCallback) {
    taskToUpdate.tags = taskToUpdate.tags.filter(x => x.id !== id);
    onUpdateCallback(taskToUpdate);
  }

  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.deleteById, id });
};

export {
  create,
  deleteById,
};
