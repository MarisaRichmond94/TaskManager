import BaseApi from 'api/base';

class TaskManagerTags extends BaseApi {
  constructor() {
    super('task_manager/tags');
  }
};

const TaskManagerTagsApi = new TaskManagerTags();
export default TaskManagerTagsApi;
