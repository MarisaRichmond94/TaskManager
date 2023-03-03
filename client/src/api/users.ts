import { makeApiRequest } from 'utils';
import { ApiMethod, ApiRoute } from 'enums';

const ROUTE = ApiRoute.users;

const get = async (
  body: FindOrCreateUserDTO,
  getAccessTokenSilently: (options?: TokenRequestProps) => Promise<string>,
  onUpdateCallback?: (user: User) => void,
): Promise<User> => {
  const user = await makeApiRequest(getAccessTokenSilently, ROUTE, { method: ApiMethod.post, body });
  if (onUpdateCallback) onUpdateCallback(user);

  return user;
};

export {
  get,
};
