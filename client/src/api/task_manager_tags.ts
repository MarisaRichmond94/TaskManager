import { makeApiRequest } from 'utils/api';
import { ApiMethod, ApiRoute } from "types/constants";

const ROUTE = ApiRoute.taskManagerTags;

const deleteById = async (
  id: string,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
): Promise<boolean> => {
  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.deleteById, id });
};
export {
  deleteById,
};
