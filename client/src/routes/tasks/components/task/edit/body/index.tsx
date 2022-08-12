import './index.scss';

import { FC } from 'react';

import TMEditableInput from 'components/tm_editable_input';
import { useTask } from 'providers/task';
import TaskChecklistItems from 'routes/tasks/components/task/edit/body/checklist_items';
import TaskComments from 'routes/tasks/components/task/edit/body/comments';

const Body: FC = () => {
  const { description, id, objective, updateTask } = useTask();

  return (
    <div className='tm-task-body'>
      <TMEditableInput
        classNames={['large-header-text', 'task-objective']}
        currInputValue={objective}
        id={`objective-${id}`}
        noInputValuePlaceholder='no objective'
        onUpdateCallback={
          (updatedObjective: string) => updateTask({ objective: updatedObjective })
        }
      />
      <TMEditableInput
        classNames={['header-text']}
        currInputValue={description}
        id={`description-${id}`}
        noInputValuePlaceholder='no description'
        onUpdateCallback={
          (updatedDescription: string) => updateTask({ description: updatedDescription })
        }
      />
      <TaskChecklistItems />
      <TaskComments />
    </div>
  );
};

export default Body;
