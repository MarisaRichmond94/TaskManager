import { useCallback, useEffect, useState } from 'react';

import BaseApi from 'api/base';
import TaskManagerApi from 'api/task_manager';
import TaskManagerTagsApi from 'api/task_manager_tags';
import TasksApi from 'api/tasks';
import TagsApi from 'api/tags';
import TasksContext from 'providers/tasks/context';
import buildTaskLists from 'providers/tasks/utils/buildTaskLists';
import { toServerDatetime } from 'utils/date';

const TasksProvider = (props: object) => {
  const [activeTaskId, setActiveTaskId] = useState<undefined | string>();
  const [attachmentTypes, setAttachmentTypes] = useState<undefined | AttachmentType[]>();
  const [statusTypes, setStatusTypes] = useState<undefined | Status[]>();
  const [tasks, setTasks] = useState<undefined | Task[]>();
  const [tags, setTags] = useState<undefined | Tag[]>();
  const [searchedTasks, setSearchedTasks] = useState<undefined | Task[]>();
  const [taskMap, setTaskMap] = useState<Map<string, Task[]>>();

  const userId = BaseApi.userId;

  const getTaskDataForUserById = async () => {
    const userTaskData = await TaskManagerApi.get();
    setAttachmentTypes(userTaskData.attachmentTypes);
    setStatusTypes(userTaskData.statusTypes);
    setTasks(userTaskData.tasks);
    setTags(userTaskData.tags);
    buildTaskLists(userTaskData.tasks, setTaskMap);
  };

  useEffect(() => {
    if (userId) setTimeout(() => { getTaskDataForUserById(); }, 1000);
  }, [userId]);

  const createTask = async () => {
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 59);
    const newTask = await TasksApi.post({ dueDate: toServerDatetime(midnight) });
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    buildTaskLists(updatedTasks, setTaskMap);
    setActiveTaskId(newTask.id);
  };

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

  const updateTaskInTasks = useCallback((updatedTask: Task) => {
    const updatedTasks = tasks.map(x => x.id === updatedTask.id ? updatedTask : x);
    setTasks(updatedTasks);
    if (searchedTasks) {
      const updatedSearchedTasks = searchedTasks.map(x => x.id === updatedTask.id ? updatedTask : x);
      setSearchedTasks(updatedSearchedTasks);
    }
    buildTaskLists(updatedTasks, setTaskMap);
  }, [searchedTasks, tasks]);

  const deleteTaskById = useCallback(async (taskId: string) => {
    if (taskId === activeTaskId) setActiveTaskId(undefined);
    if (searchedTasks) setSearchedTasks(searchedTasks.filter(task => task.id !== taskId));
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    buildTaskLists(updatedTasks, setTaskMap);
    await TaskManagerApi.deleteById(taskId);
  }, [activeTaskId, searchedTasks, tasks]);

  const updateActiveTaskId = (id?: string) => {
    if (activeTaskId !== id) setActiveTaskId(id);
  };

  // Tag functionality
  const createTag = async (createTagDTO: CreateTagDTO) => {
    const newTag = await TagsApi.post(createTagDTO);
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
  };

  const updateTag = async (tagId: string, updateTagDTO: UpdateTagDTO) => {
    await TagsApi.update(tagId, updateTagDTO);
    getTaskDataForUserById();
  };

  const deleteTag = async (tagIdToDelete: string) => {
    const isSuccessfullyDeleted = await TaskManagerTagsApi.deleteById(tagIdToDelete);
    if (isSuccessfullyDeleted) getTaskDataForUserById();
  };

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
    createTask,
    createTag,
    deleteTaskById,
    deleteTag,
    updateActiveTaskId,
    updateTag,
    updateTaskInTasks,
  };

  return <TasksContext.Provider value={value} {...props} />;
};

export default TasksProvider;
