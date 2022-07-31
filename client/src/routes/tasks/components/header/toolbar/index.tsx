import './index.scss';

import { KeyboardEvent, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { TMButton } from 'components/tm_button';
import useKeyStroke from 'hooks/useKeyStroke';
import { useTasks } from 'providers/tasks';
import { HOT_KEYS } from 'settings';

const { NEW_TASK_KEY } = HOT_KEYS;

const Toolbar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { createTask } = useTasks();
  const [isAsc, setIsAsc] = useState(false);

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case NEW_TASK_KEY: createTask(); break;
    }
  };

  useKeyStroke([{ shiftKey: true, key: NEW_TASK_KEY }], handleKeyStrokes);

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
