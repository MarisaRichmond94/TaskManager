import './index.scss';

import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { TMButton } from 'components/tm_button';
import { useTasks } from 'providers/tasks';

const Toolbar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { createTask } = useTasks();

  const [isAsc, setIsAsc] = useState(false);

  const updateSortOrder = (updatedSortOrder: boolean) => {
    setIsAsc(updatedSortOrder);
    const searchParams = new URLSearchParams();
    searchParams.set('asc', updatedSortOrder.toString());
    navigate({ search: searchParams.toString() });
  };

  return (
    <div id='task-header-toolbar'>
      <TMButton
        buttonStyle='icon'
        classNames={['task-toolbar-icon']}
        onClick={() => updateSortOrder(!isAsc)}
        size='medium'
      >
        {isAsc ? <RiSortAsc /> : <RiSortDesc />}
      </TMButton>
      <TMButton
        buttonStyle='icon'
        classNames={['task-toolbar-icon']}
        onClick={() => console.log('filter tasks')}
        size='small'
      >
        <FaFilter />
      </TMButton>
      <TMButton
        buttonStyle='icon'
        classNames={['task-toolbar-icon']}
        onClick={createTask}
        size='large'
      >
        <IoMdAdd />
      </TMButton>
    </div>
  );
};

export default Toolbar;
