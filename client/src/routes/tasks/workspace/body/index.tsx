import './index.scss';

import { FC } from 'react';

import TMEditableField, { FieldType } from 'components/tm_editable_field';
import { useTask } from 'providers/task';
import TaskChecklistItems from 'routes/tasks/workspace/checklist_items';
import TaskComments from 'routes/tasks/workspace/comments';

const Body: FC = () => {
  const { description, objective, updateTask } = useTask();

  return (
    <div className='tm-task-body'>
      <TMEditableField
        classNames={['large-header-text', 'task-objective']}
        fieldType={FieldType.plainText}
        initialValue={objective}
        placeholder='no objective'
        onUpdateCallback={
          (updatedObjective: string) => updateTask({ objective: updatedObjective })
        }
      />
      <TMEditableField
        classNames={['header-text']}
        fieldType={FieldType.richText}
        initialValue={!!description ? JSON.parse(description) : undefined}
        placeholder='no description'
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
