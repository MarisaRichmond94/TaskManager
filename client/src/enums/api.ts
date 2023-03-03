enum ApiMethod { post, get, getById, patch, delete, deleteById };

enum ApiRoute {
  checklistItems = 'checklist_items',
  comments = 'comments',
  statuses = 'statuses',
  tags = 'tags',
  taskAttachments = 'task_manager/task/attachments',
  taskManager = 'task_manager',
  tasks = 'task_manager/tasks',
  taskTags = 'task_manager/task/tags',
  users = 'users',
};

export {
  ApiMethod,
  ApiRoute,
};
