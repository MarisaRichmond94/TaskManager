import './index.scss';

import { FC, KeyboardEvent, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaFilter } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { TMButton } from 'components/tm_button';
import TMCheckbox from 'components/tm_button/tm_checkbox';
import useKeyStroke from 'hooks/useKeyStroke';
import useOnClickOutside from 'hooks/useOnOutsideClick';
import { useTasks } from 'providers/tasks';
import { HOT_KEYS } from 'settings';

const { NEW_TASK_KEY } = HOT_KEYS;

const Toolbar: FC = () => {
  const navigate = useNavigate();
  const { createTask } = useTasks();
  const [isAsc, setIsAsc] = useState(false);
  const [showTaskMenu, setShowTaskMenu] = useState(false);

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
      <div className='menu-container'>
        <TMButton
          buttonStyle='icon'
          classNames={['task-toolbar-icon']}
          onClick={() => setShowTaskMenu(!showTaskMenu)}
          size='large'
        >
          <AiOutlineMenu />
        </TMButton>
        {showTaskMenu && <TaskMenu setShowTaskMenu={setShowTaskMenu} />}
      </div>
    </div>
  );
};

interface ITaskMenu {
  setShowTaskMenu: (showTaskMenu: boolean) => void,
};

const TaskMenu: FC<ITaskMenu> = ({ setShowTaskMenu }) => {
  const { isShowingArchivedTasks, setIsShowingArchivedTasks } = useTasks();
  const taskMenuRef = useRef(null);
  useOnClickOutside(taskMenuRef, () => setShowTaskMenu(false));

  return (
    <div className='menu' ref={taskMenuRef}>
      <div className='menu-item'>
        <TMCheckbox
          classNames={['task-menu-item']}
          isActive={isShowingArchivedTasks}
          textBlock='show archived'
          toggleIsActive={() => setIsShowingArchivedTasks(!isShowingArchivedTasks)}
        />
      </div>
    </div>
  );
};

export default Toolbar;
