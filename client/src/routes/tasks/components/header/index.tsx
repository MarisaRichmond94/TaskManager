import './index.scss';

import { ReactElement } from 'react';

import { TMInput } from 'components/tm_input';
import Toolbar from 'routes/tasks/components/header/toolbar';

export interface TasksHeaderProps {
  searchText: string,
  updateSearchText: (updatedSearchText: string) => void,
};

const Header = ({
  searchText,
  updateSearchText,
}: TasksHeaderProps): ReactElement => {
  return (
    <div id='task-header'>
      <TMInput
        id='tasks-search-bar'
        formValue={searchText}
        onChangeCallback={(updatedSearchText: string) => updateSearchText(updatedSearchText)}
        placeholder='search tasks...'
        type='search'
      />
      <Toolbar />
    </div>
  );
};

export default Header;
