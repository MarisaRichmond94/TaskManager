import './index.scss';

import { FC } from 'react';

import TaskChecklistItems from 'routes/tasks/components/task/edit/body/checklist_items';
import TaskComments from 'routes/tasks/components/task/edit/body/comments';

interface IBody {
  id: string,
  checklistItems?: ChecklistItem[],
  comments?: Comment[],
  description?: string,
  objective?: string,
};

const Body: FC<IBody> = ({ id, checklistItems, comments, description, objective }) => {
  return (
    <div className='tm-task-body'>
      <div className='large-header-text task-objective'>
        <b>{objective}</b>
      </div>
      <div className='sub-header-text'>
        {description || 'No description'}
      </div>
      <TaskChecklistItems id={id} checklistItems={checklistItems} />
      <TaskComments id={id} comments={comments} />
    </div>
  );
};

export default Body;
