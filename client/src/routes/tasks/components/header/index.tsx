import './index.scss';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

import { TMInput } from 'components/tm_input';
import useQuery from 'hooks/useQuery';
import Toolbar from 'routes/tasks/components/header/toolbar';

const Header: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = useQuery(search);

  const [searchText, setSearchText] = useState(query.get('searchText') || '');
  const [debounceUpdateSearch] = useState(
    () => debounce(
      250, false, (text: string): void => {
        const searchParams = new URLSearchParams();
        if (text !== '') searchParams.set('searchText', text);
        navigate({ search: searchParams.toString() });
      }
    ),
  );

  return (
    <div id='task-header'>
      <TMInput
        id='tasks-search-bar'
        formValue={searchText}
        onChangeCallback={
          (updatedSearchText: string) => {
            setSearchText(updatedSearchText);
            debounceUpdateSearch(updatedSearchText);
          }
        }
        placeholder='search tasks...'
        type='search'
      />
      <Toolbar />
    </div>
  );
};

export default Header;
