import './index.scss';

import { FC } from 'react';

import { useTask } from 'providers/task';
import TaskChecklistItems from 'routes/tasks/components/task/edit/body/checklist_items';
import TaskComments from 'routes/tasks/components/task/edit/body/comments';

const Body: FC = () => {
  const { description, objective } = useTask();

  return (
    <div className='tm-task-body'>
      <div className='large-header-text task-objective'>
        <b>{objective}</b>
      </div>
      <div className='sub-header-text'>
        {description || 'No description'}
      </div>
      <TaskChecklistItems />
      <TaskComments />
    </div>
  );
};

export default Body;
