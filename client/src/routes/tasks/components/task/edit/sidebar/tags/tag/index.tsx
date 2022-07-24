import './index.scss';

import { FC } from 'react';
import { BsX } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import { TMButton } from 'components/tm_button';

interface ITaskTag {
  hexColor: string,
  isInUse?: boolean,
  name: string,
};

const TaskTag: FC<ITaskTag> = ({ hexColor, isInUse = true, name }) => (
  <div className='task-tag' style={{ backgroundColor: hexColor }}>
    <div className='sub-header-text'>{name}</div>
    <TMButton
      buttonStyle='icon'
      size='medium'
      onClick={
        isInUse
          ? () => console.log('Remove tag from task')
          : () => console.log('Add tag to task')
      }
    >
      {isInUse ? <BsX /> : <IoMdAdd />}
    </TMButton>
  </div>
);

export default TaskTag;
