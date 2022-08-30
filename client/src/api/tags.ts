import { makeApiRequest } from 'utils/api';
import { ApiMethod, ApiRoute } from "types/constants";

const ROUTE = ApiRoute.tags;

const create = async (
  body: CreateTagDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
): Promise<Tag> => {
  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.post, body });
};

const update = async (
  id: string,
  body: UpdateTagDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
): Promise<Tag> => {
  return makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.patch, body, id });
};

export {
  create,
  update,
};
