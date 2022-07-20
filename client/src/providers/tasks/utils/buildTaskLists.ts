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

    const today = new Date();
    const yesterday = getModifiedDate(today, -1);
    const tomorrow = getModifiedDate(today, 1);
    const theDayAfterTomorrow = getModifiedDate(today, 2);

    taskList.forEach(task => {
      const dueDate = toClientDatetime(task.dueDate);
      if (task.isArchived) taskMap.get('Archived').push(task);
      else if (yesterday < dueDate && dueDate < tomorrow) taskMap.get('Today').push(task);
      else if (today < dueDate && dueDate < theDayAfterTomorrow) taskMap.get('Tomorrow').push(task);
      else if (tomorrow < dueDate) taskMap.get('Upcoming').push(task);
      else taskMap.get('Overdue').push(task);
    });

    setTaskMap(taskMap);
  };

export default buildTaskLists;
