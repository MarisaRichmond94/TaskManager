import './index.scss';

import { createRef, KeyboardEvent, FC } from 'react';
import { useLocation } from 'react-router-dom';

import TMInput from 'components/tm_input';
import useKeyStroke from 'hooks/useKeyStroke';
import { useSearchTasks } from 'providers/search_tasks';
import Toolbar from 'routes/tasks/header/toolbar';
import { HOT_KEYS } from 'settings';

const { FOCUS_SEARCH_KEY } = HOT_KEYS;

const Header: FC = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchText = searchParams.get('searchText') || '';

  const { updateSearchText } = useSearchTasks();
  const searchInputRef = createRef<HTMLInputElement>();

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case FOCUS_SEARCH_KEY:
        event.preventDefault();
        searchInputRef?.current?.focus();
        break;
    }
  };
  useKeyStroke([{ shiftKey: true, key: FOCUS_SEARCH_KEY }], handleKeyStrokes);

  return (
    <div id='task-header'>
      <TMInput
        id='tasks-search-bar'
        formValue={searchText}
        onChangeCallback={(updatedSearchText: string) => updateSearchText(updatedSearchText)}
        placeholder='search tasks...'
        ref={searchInputRef}
        type='search'
      />
      <Toolbar />
    </div>
  );
};

export default Header;
