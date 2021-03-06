import './index.scss';

import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { TMButton } from 'components/tm_button';

const Toolbar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

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
        onClick={() => console.log('create new task')}
        size='large'
      >
        <IoMdAdd />
      </TMButton>
    </div>
  );
};

export default Toolbar;
