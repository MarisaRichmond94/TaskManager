import { useCallback, useEffect, useState } from 'react';

import BaseApi from 'api/base';
import TaskManagerApi from 'api/taskManager';
import TasksApi from 'api/tasks';
import TasksContext from 'providers/tasks/context';
import buildTaskLists from 'providers/tasks/utils/buildTaskLists';

const TasksProvider = (props: object) => {
  const [activeTaskId, setActiveTaskId] = useState<undefined | string>();
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

  const archiveTaskById = useCallback(async (taskId: string) => {
    const taskById = tasks.find(task => task.id === taskId);
    const archivedTask = {...taskById};
    const updatedTask = await TasksApi.update(taskId, { isArchived: true });
    archivedTask.isArchived = updatedTask.isArchived;
    const updatedTasks = tasks.map(task => task.id === archivedTask.id ? archivedTask : task);
    setTasks(updatedTasks);
    if (searchedTasks) setSearchedTasks(searchedTasks.filter(task => task.id !== archivedTask.id));
    buildTaskLists(updatedTasks, setTaskMap);
  }, [searchedTasks, tasks]);

  const deleteTaskById = useCallback(async (taskId: string) => {
    const isSuccessfullyDeleted = await TaskManagerApi.deleteById(taskId);
    if (isSuccessfullyDeleted) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      if (taskId === activeTaskId) setActiveTaskId(undefined);
      if (searchedTasks) setSearchedTasks(searchedTasks.filter(task => task.id !== taskId));
      buildTaskLists(updatedTasks, setTaskMap);
    }
  }, [activeTaskId, searchedTasks, tasks]);

  const updateTaskInTasks = useCallback((updatedTask: Task) => {
    const updatedTasks = tasks.map(x => x.id === updatedTask.id ? updatedTask : x);
    setTasks(updatedTasks);
    if (searchedTasks) {
      const updatedSearchedTasks = searchedTasks.map(x => x.id === updatedTask.id ? updatedTask : x);
      setSearchedTasks(updatedSearchedTasks);
    }
    buildTaskLists(updatedTasks, setTaskMap);
  }, [searchedTasks, tasks]);

  const updateActiveTaskId = (id?: string) => { if (activeTaskId !== id) setActiveTaskId(id); };

  const value = {
    activeTaskId,
    attachmentTypes,
    searchedTasks,
    statusTypes,
    tags,
    tasks,
    taskMap,
    userTaskDataLoaded: !!(tasks && tags),
    archiveTaskById,
    deleteTaskById,
    updateActiveTaskId,
    updateTaskInTasks,
  };

  return <TasksContext.Provider value={value} {...props} />;
};

export default TasksProvider;
