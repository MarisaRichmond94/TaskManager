import { getModifiedDate, toClientDatetime } from 'utils/date';

const buildTaskLists = (
  taskList: Task[],
  setTaskMap: (taskMap: Map<string, Task[]>) => void,
): any => {
  const taskMap = new Map<string, Task[]>([
    ['Today', []],
    ['Tomorrow', []],
    ['Upcoming', []],
    ['Overdue', []],
    ['Archived', []],
  ]);

  const date = new Date();
  const tomorrow = getModifiedDate(date, 1).setHours(0,0,0,0).valueOf();
  const theDayAfterTomorrow = getModifiedDate(date, 2).setHours(0,0,0,0).valueOf();
  const today = date.valueOf();

  taskList.forEach(task => {
    const dueDate = toClientDatetime(task.dueDate).valueOf();
    if (task.isArchived) taskMap.get('Archived').push(task);
    else if (dueDate < today) taskMap.get('Overdue').push(task);
    else if (dueDate >= theDayAfterTomorrow) taskMap.get('Upcoming').push(task);
    else if (dueDate > today && dueDate < tomorrow) taskMap.get('Today').push(task);
    else taskMap.get('Tomorrow').push(task);
  });

  setTaskMap(taskMap);
};

export default buildTaskLists;
