import './index.scss';

import { useState } from 'react';
import { BsTrophyFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';

import { TMButton } from 'components/tm_button';
import { TMToggleButton } from 'components/tm_button/tm_toggle';
import { GOALS_ROUTE, NOTES_ROUTE, TASKS_ROUTE } from 'settings';

const TMSidebar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname: path } = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div id='tm-sidebar'>
      <div id='tm-top-menu'>
        <TMToggleButton
          onClick={() => setIsExpanded(!isExpanded)}
          selected={isExpanded}
        />
      </div>
      <div id='tm-bottom-menu'>
        <TMButton
          classNames={['tm-sidebar-icon', path === TASKS_ROUTE ? 'active' : '']}
          buttonStyle='icon'
          onClick={() => navigate(TASKS_ROUTE)}
          size='extra-large'
        >
          <FaTasks />
        </TMButton>
        <TMButton
          classNames={['tm-sidebar-icon', path === NOTES_ROUTE ? 'active' : '']}
          buttonStyle='icon'
          onClick={() => navigate(NOTES_ROUTE)}
          size='extra-large'
        >
          <GiNotebook />
        </TMButton>
        <TMButton
          classNames={['tm-sidebar-icon', path === GOALS_ROUTE ? 'active' : '']}
          buttonStyle='icon'
          onClick={() => navigate(GOALS_ROUTE)}
          size='extra-large'
        >
          <BsTrophyFill />
        </TMButton>
      </div>
    </div>
  );
};

export default TMSidebar;
