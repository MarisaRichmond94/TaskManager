import BaseApi from 'api/base';

class Users extends BaseApi {
  constructor() {
    super('users');
  }
};

const UsersApi = new Users();
export default UsersApi;
