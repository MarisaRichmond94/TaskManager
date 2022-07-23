import BaseApi from 'api/base';

class Users extends BaseApi {
  constructor() {
    super('users');
  }

  override async get(query?: {}): Promise<any> {
    const response = await super.get(query);
    BaseApi.setUserId(response[0].id);
    return response;
  }
};

const UsersApi = new Users();
export default UsersApi;
