import BaseApi from 'api/base';

class TaskTags extends BaseApi {
  constructor() {
    super('task_tags');
  }
};

const TaskTagsApi = new TaskTags();
export default TaskTagsApi;
