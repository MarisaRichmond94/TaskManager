import BaseApi from 'api/base';

class TaskManager extends BaseApi {
  constructor() {
    super('task_manager');
  }
};

const TaskManagerApi = new TaskManager();
export default TaskManagerApi;
