import './index.scss';

import { FC, useEffect, useRef } from 'react';

import { useTasks } from 'providers/tasks';
import Body from 'routes/tasks/task/body';
import Footer from 'routes/tasks/task/footer';
import Header from 'routes/tasks/task/header';
import { ARCHIVED_TASK_STATUS_NAMES } from 'settings/task';

interface ITaskCard {
  task: Task,
};

const TaskCard: FC<ITaskCard> = ({ task }) => {
  const { activeTaskId, updateActiveTaskId } = useTasks();
  const taskRef = useRef(null);
  const { id, objective, status } = task;
  const { description } = task;
  const { checklistItems, comments, dueDate, tags } = task;
  const isActiveTask = activeTaskId === id;
  const isArchived = ARCHIVED_TASK_STATUS_NAMES.includes(status.name);

  useEffect(() => {
    if (isActiveTask && taskRef.current) taskRef.current.scrollIntoView();
  }, [isActiveTask, taskRef]);

  return (
    <div
      className={['task-card', isActiveTask ? 'active' : ''].join(' ')}
      onClick={() => updateActiveTaskId(id)}
      ref={taskRef}
    >
      <Header id={id} isArchived={isArchived} objective={objective} status={status} />
      <Body description={description} />
      <Footer checklistItems={checklistItems} comments={comments} dueDate={dueDate} tags={tags} />
    </div>
  );
};

export default TaskCard;
