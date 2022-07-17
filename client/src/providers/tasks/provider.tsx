import { useEffect, useState } from 'react';

import BaseApi from 'api/base';
import TaskManagerApi from 'api/taskManager';
import TasksContext from 'providers/tasks/context';
import buildTaskLists from 'providers/tasks/utils/buildTaskLists';

const TasksProvider = (props: object) => {
  const [attachmentTypes, setAttachmentTypes] = useState<undefined | AttachmentType[]>();
  const [statusTypes, setStatusTypes] = useState<undefined | Status[]>();
  const [tasks, setTasks] = useState<undefined | Task[]>();
  const [tags, setTags] = useState<undefined | Tag[]>();
  const [searchedTasks, setSearchedTasks] = useState<undefined | Task[]>();
  const [taskMap, setTaskMap] = useState<Map<string, Task[]>>();

  const userId = BaseApi.userId;

  useEffect(() => {
    async function getTaskDataForUserById() {
      const userTaskData = await TaskManagerApi.get();
      setAttachmentTypes(userTaskData.attachmentTypes);
      setStatusTypes(userTaskData.statusTypes);
      setTasks(userTaskData.tasks);
      setTags(userTaskData.tags);
      buildTaskLists(userTaskData.tasks, setTaskMap);
    };

    if (userId) setTimeout(() => { getTaskDataForUserById(); }, 1000);
  }, [userId]);

  const value = {
    attachmentTypes,
    searchedTasks,
    statusTypes,
    tags,
    taskMap,
    userTaskDataLoaded: !!(tasks && tags),
  };

  return <TasksContext.Provider value={value} {...props} />;
};

export default TasksProvider;
