import { makeApiRequest } from 'utils';
import { ApiMethod, ApiRoute } from 'types/constants/api';

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
