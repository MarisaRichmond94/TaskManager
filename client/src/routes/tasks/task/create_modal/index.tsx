import './index.scss';

import { useTasks } from 'providers/tasks';

const CreateTaskModal = () => {
  const { createTask } = useTasks();

  return (
    <div className='tm-modal' id='create-task-modal'>Create Task</div>
  );
};

export default CreateTaskModal;
