import { useEffect, useState } from 'react';

import BaseApi from 'api/base';
import TaskManagerApi from 'api/taskManager';
import TasksContext from 'providers/tasks/context';

const TasksProvider = (props: object) => {
  const [tasks, setTasks] = useState<undefined | Task[]>();
  const [tags, setTags] = useState<undefined | Tag[]>();
  const [searchedTasks, setSearchedTasks] = useState<undefined | Task[]>();
  const [taskMap, setTaskMap] = useState<Map<string, Task[]>>();

  const userId = BaseApi.userId;

  useEffect(() => {
    async function getTaskDataForUserById() {
      const userTaskData = await TaskManagerApi.get();
      setTasks(userTaskData.tasks);
      setTags(userTaskData.tags);
      buildTaskLists(userTaskData.tasks);
    };

    if (userId) {
      setTimeout(() => {
        getTaskDataForUserById();
      }, 1000);
    }
  }, [userId]);

  const buildTaskLists = (taskList: Task[]): any => {
    const tm = new Map<string, Task[]>([
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
      if (yesterday < dueDate && dueDate < tomorrow) tm.get('Today').push(task);
      else if (today < dueDate && dueDate < theDayAfterTomorrow) tm.get('Tomorrow').push(task);
      else if (tomorrow < dueDate) tm.get('Upcoming').push(task);
      else tm.get('Overdue').push(task);
    });

    setTaskMap(tm);
  };

  const value = {
    searchedTasks,
    tags,
    taskMap,
    userTaskDataLoaded: !!(tasks && tags),
  };

  return <TasksContext.Provider value={value} {...props} />;
};

export default TasksProvider;
