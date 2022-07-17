import './index.scss';

import { ReactElement } from 'react';

import TaskChecklistItems from 'routes/tasks/components/task_card/body/checklist_items';
import TaskComments from 'routes/tasks/components/task_card/body/comments';

interface BodyProps {
  id: string,
  checklistItems?: ChecklistItem[],
  comments?: Comment[],
  description?: string,
  objective?: string,
};

const Body = ({ id, checklistItems, comments, description, objective }: BodyProps): ReactElement => {
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
