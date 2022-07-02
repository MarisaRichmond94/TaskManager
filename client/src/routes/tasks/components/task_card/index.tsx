import './index.scss';

import { ReactElement } from 'react';

interface TaskCardProps {
  task: Task,
};

const TaskCard = ({ task }: TaskCardProps): ReactElement => {
  const { id, objective, description, dueDate } = task;

  return (
    <div className='tm-task-card'>

    </div>
  );
};

export default TaskCard;
