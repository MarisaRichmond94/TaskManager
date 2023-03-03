import { makeApiRequest } from 'utils';
import { ApiMethod, ApiRoute } from 'enums';

const ROUTE = ApiRoute.taskManager;

const get = async (
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
): Promise<UserTaskData> => {
  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.get });
};

export {
  get,
};
