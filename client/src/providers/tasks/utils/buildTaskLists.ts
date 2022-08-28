
import { ARCHIVED_TASK_STATUS_NAMES } from 'settings/task';
import { SectionType } from 'types/constants';
import { getModifiedDate, toClientDatetime } from 'utils/date';

const buildTaskLists = (
  taskList: Task[],
  setTaskMap: (taskMap: Map<string, Task[]>) => void,
  shouldUpdate: boolean = true,
): Map<string, Task[]> => {
  const taskMap = new Map<string, Task[]>([
    [SectionType.Today, []],
    [SectionType.Tomorrow, []],
    [SectionType.Upcoming, []],
    [SectionType.Overdue, []],
    [SectionType.Archived, []],
  ]);

  const date = new Date();
  const tomorrow = getModifiedDate(date, 1).setHours(0,0,0,0).valueOf();
  const theDayAfterTomorrow = getModifiedDate(date, 2).setHours(0,0,0,0).valueOf();
  const today = date.valueOf();

  taskList.forEach(task => {
    const dueDate = toClientDatetime(task.dueDate).valueOf();
    if (ARCHIVED_TASK_STATUS_NAMES.includes(task.status.name)) taskMap.get('Archived').push(task);
    else if (dueDate < today) taskMap.get('Overdue').push(task);
    else if (dueDate >= theDayAfterTomorrow) taskMap.get('Upcoming').push(task);
    else if (dueDate > today && dueDate < tomorrow) taskMap.get('Today').push(task);
    else taskMap.get('Tomorrow').push(task);
  });

  if (shouldUpdate) setTaskMap(taskMap);

  return taskMap
};

export default buildTaskLists;
