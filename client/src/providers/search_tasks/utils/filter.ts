
import { ARCHIVED_TASK_STATUS_NAME } from "settings";
import { compareDates } from "utils/date";

const bySearchText = (tasksToFilter: Task[], searchText: string): Task[] => {
  if (searchText === '') return tasksToFilter;
  const matchText = searchText.toLowerCase();
  return tasksToFilter.filter(x => x.objective.toLowerCase().includes(matchText));
};

const byStartDate = (tasksToFilter: Task[], startDateFilter?: Date): Task[] => {
  return !!startDateFilter
    ? tasksToFilter.filter(x => compareDates(x.dueDate, startDateFilter, false))
    : tasksToFilter;
};

const byEndDate = (tasksToFilter: Task[], endDateFilter?: Date): Task[] => {
  return !!endDateFilter
    ? tasksToFilter.filter(x => compareDates(x.dueDate, endDateFilter))
    : tasksToFilter;
};

const byIncludeArchived = (tasksToFilter: Task[], includeArchived: boolean): Task[] => {
  return includeArchived
    ? tasksToFilter
    : tasksToFilter.filter(task => task.status.name !== ARCHIVED_TASK_STATUS_NAME);
};

const byStatus = (tasksToFilter: Task[], statusFilter?: Status): Task[] => {
  return !!statusFilter
    ? tasksToFilter.filter(task => task.status.name === statusFilter.name)
    : tasksToFilter;
};

const byTags = (tasksToFilter: Task[], tagFilters: string[]): Task[] => {
  if (!tagFilters.length) return tasksToFilter;
  return tasksToFilter.filter(task => {
    const taskTagIds = task.tags.map(tag => tag.tagId);
    return tagFilters.every(tagFilter => taskTagIds.includes(tagFilter));
  });
};



export {
  bySearchText,
  byStartDate,
  byEndDate,
  byIncludeArchived,
  byStatus,
  byTags,
};
