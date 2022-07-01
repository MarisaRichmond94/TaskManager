import './index.scss';

import { BsTrophyFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';

import userProfilePic from 'assets/profile.jpeg'; // TODO - this is a placeholder
import { TMButton } from 'components/tm_button';
import { TMToggleButton } from 'components/tm_button/tm_toggle';
import { useApp } from 'providers/app';
import { GOALS_ROUTE, NOTES_ROUTE, TASKS_ROUTE } from 'settings';

const TMSidebar: React.FC = (): JSX.Element => {
  const { isExpanded, toggleIsExpanded } = useApp();
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  return (
    <div id='tm-sidebar'>
      <div id='tm-top-menu'>
        <img
          alt='google user profile'
          id='user-profile-pic'
          src={userProfilePic}
        />
        <TMToggleButton
          onClick={() => toggleIsExpanded()}
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
