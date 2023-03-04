import './Tag.scss';

import { FC } from 'react';
import { BsX } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import TMEditableField, { FieldType } from 'components/tm_editable_field';
import { useTask, useTasks } from 'providers';

interface TaskTagProps {
  hexColor: string,
  id: string,
  name: string,
  tagId: string,
  autoFocus?: boolean,
  isEditable?: boolean,
  isInUse?: boolean,
};

const TaskTag: FC<TaskTagProps> = ({
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
            <TMEditableField
              autoFocus={autoFocus}
              changeBackgroundOnHover={false}
              classNames={['editable-tag', 'sub-header-text']}
              fieldType={FieldType.plainText}
              initialValue={name}
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
        type={ButtonType.icon}
        size={ButtonSize.medium}
        onClick={isInUse ? handleDelete : addTagToTask}
      >
        {isInUse ? <BsX /> : <IoMdAdd />}
      </TMButton>
    </div>
  );
};

export default TaskTag;
