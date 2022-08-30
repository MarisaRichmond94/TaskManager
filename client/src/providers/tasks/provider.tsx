import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import * as StatusesApi from 'api/statuses';
import * as TagsApi from 'api/tags';
import * as TaskManagerTagsApi from 'api/task_manager_tags';
import * as TaskManagerApi from 'api/task_manager';
import * as TasksApi from 'api/tasks';
import useActionOnInterval from 'hooks/useActionOnInterval';
import { useApp } from 'providers/app';
import TasksContext from 'providers/tasks/context';
import buildTaskLists from 'providers/tasks/utils/buildTaskLists';
import { TASK_MAP_SYNC_INTERVAL } from 'settings/task';
import { toServerDatetime } from 'utils/date';

const TasksProvider = (props: object) => {
  const { user } = useApp();
  const { getAccessTokenSilently } = useAuth0();

  // data from the back-end
  const [attachmentTypes, setAttachmentTypes] = useState<undefined | AttachmentType[]>();
  const [statusTypes, setStatusTypes] = useState<undefined | Status[]>();
  const [tasks, setTasks] = useState<undefined | Task[]>();
  const [tags, setTags] = useState<undefined | Tag[]>();

  // derived state
  const [activeTaskId, setActiveTaskId] = useState<undefined | string>();
  const [isShowingArchivedTasks, setIsShowingArchivedTasks] = useState(false);
  const [taskMap, setTaskMap] = useState<Map<string, Task[]>>();

  const { search } = useLocation();
  const isAsc = new URLSearchParams(search).get('asc') === 'true';

  /**
   * Performs a sync on an interval to ensure that the task map stays up to date with task due
   * dates. If a task becomes overdue, the task map will update to reflect this without having to
   * reload the page or perform some kind of action that rebuilds the task map.
   */
  const syncTaskMap = useCallback(async () => {
      const nextTaskMap = buildTaskLists(tasks, setTaskMap, false);
      const currTaskCounts = taskMap && Array.from(taskMap).map(([_, values]) => values.length);
      const nextTaskCounts = Array.from(nextTaskMap).map(([_, values]) => values.length);

      if (JSON.stringify(currTaskCounts) !== JSON.stringify(nextTaskCounts)) {
        setTaskMap(nextTaskMap);
      }
  }, [taskMap, tasks]);
  useActionOnInterval(syncTaskMap, TASK_MAP_SYNC_INTERVAL);

  const getTaskDataForUserById = useCallback(async () => {
    const userTaskData = await TaskManagerApi.get(getAccessTokenSilently);
    setAttachmentTypes(userTaskData.attachmentTypes);
    setStatusTypes(userTaskData.statusTypes);
    setTasks(userTaskData.tasks);
    setTags(userTaskData.tags);
    buildTaskLists(userTaskData.tasks, setTaskMap);
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (user?.id) getTaskDataForUserById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Task functionality
  const createTask = async () => {
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 59);
    const body = { dueDate: toServerDatetime(midnight) };
    const newTask = await TasksApi.create(body, getAccessTokenSilently);
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    buildTaskLists(updatedTasks, setTaskMap);
    setActiveTaskId(newTask.id);
  };

  const archiveTaskById = useCallback(async (taskId: string) => {
    const statusTypeId = statusTypes.find(x => x.name === 'Archived')?.id;
    const taskById = tasks.find(task => task.id === taskId);
    const archivedTask = {...taskById};
    const id = taskById.status.id;
    const body = { statusTypeId };
    archivedTask.status = await StatusesApi.update(id, body, getAccessTokenSilently);
    const updatedTasks = tasks.map(task => task.id === archivedTask.id ? archivedTask : task);
    setTasks(updatedTasks);
    buildTaskLists(updatedTasks, setTaskMap);
  }, [statusTypes, tasks, getAccessTokenSilently]);

  const updateTaskInTasks = useCallback((updatedTask: Task) => {
    const updatedTasks = tasks.map(x => x.id === updatedTask.id ? updatedTask : x);
    setTasks(updatedTasks);
    buildTaskLists(updatedTasks, setTaskMap);
  }, [tasks]);

  const deleteTaskById = useCallback(async (id: string) => {
    if (id === activeTaskId) setActiveTaskId(undefined);
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    buildTaskLists(updatedTasks, setTaskMap);
    await TaskManagerApi.deleteById(id, getAccessTokenSilently);
  }, [activeTaskId, tasks, getAccessTokenSilently]);

  const updateActiveTaskId = (id?: string) => {
    if (activeTaskId !== id) setActiveTaskId(id);
  };

  // Tag functionality
  const createTag = useCallback(async (body: CreateTagDTO) => {
    const newTag = await TagsApi.create(body, getAccessTokenSilently);
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
  }, [getAccessTokenSilently, tags]);

  const updateTag = useCallback(async (id: string, body: UpdateTagDTO) => {
    await TagsApi.update(id, body, getAccessTokenSilently);
    getTaskDataForUserById();
  }, [getAccessTokenSilently, getTaskDataForUserById]);

  const deleteTag = useCallback(async (id: string) => {
    const isSuccessfullyDeleted = await TaskManagerTagsApi.deleteById(id, getAccessTokenSilently);
    if (isSuccessfullyDeleted) getTaskDataForUserById();
  }, [getAccessTokenSilently, getTaskDataForUserById]);

  // Sort functionality
  const sortTasks = useCallback((tasks: Task[]): Task[] =>
    isAsc
      ? tasks?.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
      : tasks?.sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1))
  , [isAsc]);

  useEffect(() => {
    if (tasks) {
      const sortedTasks = sortTasks(tasks);
      setTasks(sortedTasks);
      buildTaskLists(sortedTasks, setTaskMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAsc]);

  const value = {
    activeTaskId,
    attachmentTypes,
    isShowingArchivedTasks,
    statusTypes,
    tags,
    tasks,
    taskMap,
    userTaskDataLoaded: !!(tasks && tags),
    archiveTaskById,
    createTask,
    createTag,
    deleteTaskById,
    deleteTag,
    setIsShowingArchivedTasks,
    updateActiveTaskId,
    updateTag,
    updateTaskInTasks,
  };

  return <TasksContext.Provider value={value} {...props} />;
};

export default TasksProvider;
