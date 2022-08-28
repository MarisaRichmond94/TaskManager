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
  FilterAction,
  FilterType,
  SectionType,
};
