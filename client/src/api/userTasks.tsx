import BaseApi from 'api/base';

class UserTasks extends BaseApi {
  constructor() {
    super('user_tasks');
  }
};

const UserTasksApi = new UserTasks();
export default UserTasksApi;
