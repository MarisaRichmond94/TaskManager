import './index.scss';

import { FC, ReactElement } from 'react';
import { BsTrophyFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import { TMToggleButton } from 'components/tm_toggle';
import { useApp } from 'providers/app';
import { ROUTES } from 'settings/routes';

const TMSidebar: FC = () => {
  const { isExpanded, toggleIsExpanded } = useApp();

  return (
    <div id='tm-sidebar'>
      <div id='tm-top-menu'>
        <UserAvatar />
        <TMToggleButton onClick={toggleIsExpanded} selected={isExpanded} />
      </div>
      <div id='tm-bottom-menu'>
        <NavigateToPageButton icon={<FaTasks />} routePath={ROUTES.tasksRoute} />
        <NavigateToPageButton icon={<GiNotebook />} routePath={ROUTES.notesRoute} />
        <NavigateToPageButton icon={<BsTrophyFill />} routePath={ROUTES.goalsRoute} />
      </div>
    </div>
  );
};

const UserAvatar = () => {
  const { user } = useApp();

  return (
    <img
      alt='google user profile'
      id='user-profile-pic'
      src={user?.avatar}
      referrerPolicy='no-referrer'
    />
  );
};

interface INavigateToPageButton {
  icon: ReactElement,
  routePath: string,
};

const NavigateToPageButton: FC<INavigateToPageButton> = ({ icon, routePath }) => {
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  return (
    <TMButton
      classNames={['tm-sidebar-icon', path === routePath ? 'active' : '']}
      buttonStyle={ButtonStyle.icon}
      onClick={() => navigate(routePath)}
      size={ButtonSize.extraLarge}
    >
      {icon}
    </TMButton>
  );
};

export default TMSidebar;
