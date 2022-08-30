enum ApiMethod { post, get, getById, patch, delete, deleteById };

enum ApiRoute {
  attachments = 'attachments',
  checklistItems = 'checklist_items',
  comments = 'comments',
  statuses = 'statuses',
  tags = 'tags',
  taskManager = 'task_manager',
  taskManagerTags = 'task_manager/tags',
  tasks = 'task_manager/tasks',
  taskTags = 'task_tags',
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
