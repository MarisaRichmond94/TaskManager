import './index.scss';

import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import TMInput from 'components/tm_input';
import { useSearchTasks } from 'providers/search/tasks';
import Toolbar from 'routes/tasks/toolbar';

const Header: FC = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchText = searchParams.get('searchText') || '';

  const { searchInputRef, updateSearchText } = useSearchTasks();

  const onKeyPressCallback = (e: any) => { if (e.key === 'Enter') e.preventDefault(); };

  return (
    <div id='task-header'>
      <TMInput
        id='tasks-search-bar'
        formValue={searchText}
        onChangeCallback={(updatedSearchText: string) => updateSearchText(updatedSearchText)}
        onKeyPressCallback={onKeyPressCallback}
        placeholder='search tasks...'
        ref={searchInputRef}
        type='search'
      />
      <Toolbar />
    </div>
  );
};

export default Header;
