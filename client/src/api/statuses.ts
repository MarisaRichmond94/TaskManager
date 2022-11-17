import { makeApiRequest } from 'utils/api';
import { ApiMethod, ApiRoute } from 'types/constants/api';

const ROUTE = ApiRoute.statuses;

const update = async (
  id: string,
  body: { [key: string]: any },
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  taskToUpdate?: Task,
  onUpdateCallback?: (updatedTask: Task) => void,
): Promise<Status> => {
  const updatedStatus = await makeApiRequest(
    getAccessTokenSilently,
    ROUTE,
    { method: ApiMethod.patch, body, id },
  );
  if (onUpdateCallback) {
    taskToUpdate.status = updatedStatus;
    onUpdateCallback(taskToUpdate);
  }

  return updatedStatus;
};

export {
  update,
};
