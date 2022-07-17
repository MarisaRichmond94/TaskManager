const buildTaskLists = (
  taskList: Task[],
  setTaskMap: (taskMap: Map<string, Task[]>) => void,
): any => {
    const taskMap = new Map<string, Task[]>([
      ['Today', []],
      ['Tomorrow', []],
      ['Upcoming', []],
      ['Overdue', []],
    ]);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const theDayAfterTomorrow = new Date();
    theDayAfterTomorrow.setDate(theDayAfterTomorrow.getDate() + 1);

    taskList.forEach(task => {
      const dueDate = new Date(task.dueDate);
      if (yesterday < dueDate && dueDate < tomorrow) taskMap.get('Today').push(task);
      else if (today < dueDate && dueDate < theDayAfterTomorrow) taskMap.get('Tomorrow').push(task);
      else if (tomorrow < dueDate) taskMap.get('Upcoming').push(task);
      else taskMap.get('Overdue').push(task);
    });

    setTaskMap(taskMap);
  };

export default buildTaskLists;
