import { makeApiRequest } from 'utils/api';
import { ApiMethod, ApiRoute } from "types/constants";

const ROUTE = ApiRoute.tasks;

const create = async (
  body: CreateTaskDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
): Promise<Task> => {
  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.post, body });
};

const update = async (
  id: string,
  body: UpdateTaskDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<Task> => {
  const task = await makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.patch, body, id });
  if (onUpdateCallback) onUpdateCallback(task);

  return task;
};

const deleteById = async (
  id: string,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
): Promise<boolean> => {
  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.deleteById, id });
};

export {
  create,
  update,
  deleteById,
};
