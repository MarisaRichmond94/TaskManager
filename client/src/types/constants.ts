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

enum FilterAction {
  remove = 'remove',
  update = 'update',
};

const enum FilterType {
  endDate = 'endDate',
  includeArchived = 'includeArchived',
  startDate = 'startDate',
  status = 'status',
  tags = 'tags',
};

enum SectionType {
  Today = 'Today',
  Tomorrow = 'Tomorrow',
  Upcoming = 'Upcoming',
  Overdue = 'Overdue',
  Archived = 'Archived',
};

export {
  ApiMethod,
  ApiRoute,
  FilterAction,
  FilterType,
  SectionType,
};
