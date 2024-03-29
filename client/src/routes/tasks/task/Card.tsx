import './Card.scss';

import { FC, useEffect, useRef } from 'react';
import { Descendant } from 'slate';

import TMRichTextViewer from 'components/tm_rich_text_field/viewer';
import { useTasks } from 'providers';
import { TaskCardFooter, TaskCardHeader } from 'routes/tasks';
import { ARCHIVED_TASK_STATUS_NAMES } from 'settings';

interface TaskCardProps {
  task: Task,
};

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const { activeTaskId, updateActiveTaskId } = useTasks();
  const taskRef = useRef(null);
  const { id, isPinned, objective, status } = task;
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
      <TaskCardHeader
        id={id}
        isArchived={isArchived}
        isPinned={isPinned}
        objective={objective}
        status={status}
      />
      {
        !!description &&
        <TMRichTextViewer
          classNames={['task-card-body', 'sub-header-text', ]}
          key={description}
          value={JSON.parse(description) as Descendant[]}
        />
      }
      <TaskCardFooter
        checklistItems={checklistItems}
        comments={comments}
        dueDate={dueDate}
        tags={tags}
      />
    </div>
  );
};

export default TaskCard;
