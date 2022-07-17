import './index.scss';

import { ReactElement } from 'react';

import Body from 'routes/tasks/components/task_card/body';
import Header from 'routes/tasks/components/task_card/header';
import Sidebar from 'routes/tasks/components/task_card/sidebar';

interface TaskCardProps {
  task: Task,
};

const TaskCard = ({ task }: TaskCardProps): ReactElement => {
  const { isPinned, status } = task;
  const { id, checklistItems, comments, description, objective } = task;
  const { attachments, createdAt, dueDate, tags, updatedAt } = task;

  return (
    <div className='tm-task-card'>
      <Header isPinned={isPinned} status={status} />
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

export default TaskCard;
