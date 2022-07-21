import './index.scss';

import { FC } from 'react';

import Body from 'routes/tasks/components/task/edit/body';
import Header from 'routes/tasks/components/task/edit/header';
import Sidebar from 'routes/tasks/components/task/edit/sidebar';

interface IEditTaskCard {
  task: Task,
};

const EditTaskCard: FC<IEditTaskCard> = ({ task }) => {
  const { isArchived, isPinned, status } = task;
  const { id, checklistItems, comments, description, objective } = task;
  const { attachments, createdAt, dueDate, tags, updatedAt } = task;

  return (
    <div className='edit-task-card'>
      <Header id={id} isArchived={isArchived} isPinned={isPinned} status={status} />
      <div className='task-content-container'>
        <Body
          id={id}
          checklistItems={checklistItems}
          comments={comments}
          description={description}
          objective={objective}
        />
        <Sidebar
          id={id}
          attachments={attachments}
          createdAt={createdAt}
          dueDate={dueDate}
          tags={tags}
          updatedAt={updatedAt}
        />
      </div>
    </div>
  );
};

export default EditTaskCard;
