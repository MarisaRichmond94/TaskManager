import { makeApiRequest } from 'utils/api';
import { ApiMethod, ApiRoute } from 'types/constants/api';

const ROUTE = ApiRoute.taskManager;

const get = async (
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
): Promise<UserTaskData> => {
  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.get });
};

export {
  get,
};
