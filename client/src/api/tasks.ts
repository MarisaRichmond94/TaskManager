import BaseApi from 'api/base';

class Tasks extends BaseApi {
  constructor() {
    super('task_manager/tasks');
  }
};

const TasksApi = new Tasks();
export default TasksApi;
