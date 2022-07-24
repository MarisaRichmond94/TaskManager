import './index.scss';

import { FC } from 'react';
import { BsX } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import { TMButton } from 'components/tm_button';
import { useTask } from 'providers/task';

interface ITaskTag {
  hexColor: string,
  id: string,
  isInUse?: boolean,
  name: string,
  tagId: string,
};

const TaskTag: FC<ITaskTag> = ({ hexColor, id, isInUse = true, name, tagId }) => {
  const { id: taskId, createTaskTag, deleteTaskTag } = useTask();

  return (
    <div className='task-tag' style={{ backgroundColor: hexColor }}>
      <div className='sub-header-text'>{name}</div>
      <TMButton
        buttonStyle='icon'
        size='medium'
        onClick={
          isInUse
            ? () => deleteTaskTag(id) // tag is a taskTag (so the id is the taskTag id)
            : () => createTaskTag({ taskId, tagId: id }) // tag is an actual tag (so the id is a tag id)
        }
      >
        {isInUse ? <BsX /> : <IoMdAdd />}
      </TMButton>
    </div>
  );
};

export default TaskTag;
