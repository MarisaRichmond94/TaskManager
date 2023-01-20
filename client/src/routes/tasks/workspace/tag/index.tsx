import './index.scss';

import { RichButton, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC } from 'react';
import { BsX } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import TMEditableField, { FieldType } from 'components/tm_editable_field';
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
      <RichButton
        onClick={isInUse ? handleDelete : addTagToTask}
        type={RichButtonType.Icon}
      >
        {isInUse ? <BsX /> : <IoMdAdd />}
      </RichButton>
    </div>
  );
};

export default TaskTag;
