import BaseApi from 'api/base';

class Users extends BaseApi {
  constructor() {
    super('users');
  }

  override async post(body: any): Promise<any> {
    const response = await super.post(body);
    BaseApi.setUserId(response.id);
    return response;
  }
};

const UsersApi = new Users();
export default UsersApi;
