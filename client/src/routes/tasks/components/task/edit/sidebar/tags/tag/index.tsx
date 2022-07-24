import './index.scss';

import { FC } from 'react';
import { BsX } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import { TMButton } from 'components/tm_button';
import TMEditableInput from 'components/tm_input/editable';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';

interface ITaskTag {
  hexColor: string,
  id: string,
  isEditable?: boolean,
  isInUse?: boolean,
  name: string,
  tagId: string,
};

const TaskTag: FC<ITaskTag> = ({
  hexColor,
  id,
  isEditable = false,
  isInUse = true,
  name,
  tagId,
}) => {
  const { id: taskId, createTaskTag, deleteTaskTag } = useTask();
  const { deleteTag, updateTag } = useTasks();
  const isTaskTag = !!(id && tagId);

  const addTagToTask = () => createTaskTag({ taskId, tagId: id });
  const handleDelete = () => isTaskTag ? deleteTaskTag(id) : deleteTag(id);

  return (
    <div className='task-tag' style={{ backgroundColor: hexColor }}>
      {
        isEditable
          ? (
            <TMEditableInput
              autoFocus
              classNames={['editable-tag', 'sub-header-text']}
              currInputValue={name}
              eventKey='Enter'
              id={`editable-tag-${id}`}
              onUpdateCallback={(name: string) => updateTag(id, { name })}
            />
          )
          : (
            <div className='sub-header-text'>
              {name}
            </div>
          )
      }
      <TMButton
        buttonStyle='icon'
        size='medium'
        onClick={isInUse ? handleDelete : addTagToTask}
      >
        {isInUse ? <BsX /> : <IoMdAdd />}
      </TMButton>
    </div>
  );
};

export default TaskTag;
