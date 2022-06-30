import { useEffect, useState } from 'react';

import BaseApi from 'api/base';
import UserTasksApi from 'api/userTasks';
import TasksContext from 'providers/tasks/context';

const TasksProvider = (props: object) => {
  const [tasks, setTasks] = useState<undefined | Task[]>();
  const [tags, setTags] = useState<undefined | Tag[]>();

  const userId = BaseApi.userId;

  useEffect(() => {
    async function getTaskDataForUserById() {
      const userTaskData = await UserTasksApi.get();
      setTasks(userTaskData.tasks);
      setTags(userTaskData.tags);
    };

    if (userId) {
      setTimeout(() => {
        getTaskDataForUserById();
      }, 500);
    }
  }, [userId]);

  const value = {
    tags,
    tasks,
  };

  return <TasksContext.Provider value={value} {...props} />;
};

export default TasksProvider;
