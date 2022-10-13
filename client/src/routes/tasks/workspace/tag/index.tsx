import './index.scss';

import { FC } from 'react';
import { BsX } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import TMEditableInput from 'components/tm_editable_input';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';

interface ITaskTag {
  hexColor: string,
  id: string,
  name: string,
  tagId: string,
  autoFocus?: boolean,
  isEditable?: boolean,
  isInUse?: boolean,
};

const TaskTag: FC<ITaskTag> = ({
  hexColor,
  id,
  name,
  tagId,
  autoFocus = false,
  isEditable = false,
  isInUse = true,
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
              autoFocus={autoFocus}
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
        buttonStyle={ButtonStyle.icon}
        size={ButtonSize.medium}
        onClick={isInUse ? handleDelete : addTagToTask}
      >
        {isInUse ? <BsX /> : <IoMdAdd />}
      </TMButton>
    </div>
  );
};

export default TaskTag;
