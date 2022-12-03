import './index.scss';

import { FC, ReactElement } from 'react';
import { BsTrophyFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import { useApp } from 'providers/app';
import { ROUTES } from 'settings/routes';

const TMSidebar: FC = () => (
  <div id='app-sidebar'>
    <TopMenu />
    <BottomMenu />
  </div>
);

const TopMenu: FC = () => {
  const { user } = useApp();

  return (
    <div className='top-menu'>
      <img alt='' src={user?.avatar} referrerPolicy='no-referrer' />
    </div>
  );
};

const BottomMenu: FC = () => (
  <div className='bottom-menu'>
    <NavigateToPageButton icon={<FaTasks />} routePath={ROUTES.tasksRoute} />
    <NavigateToPageButton icon={<GiNotebook />} routePath={ROUTES.notesRoute} />
    <NavigateToPageButton icon={<BsTrophyFill />} routePath={ROUTES.goalsRoute} />
  </div>
);

interface INavigateToPageButton {
  icon: ReactElement,
  routePath: string,
};

const NavigateToPageButton: FC<INavigateToPageButton> = ({ icon, routePath }) => {
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  return (
    <TMButton
      classNames={['sidebar-menu-button', path === routePath ? 'active' : '']}
      buttonStyle={ButtonStyle.icon}
      onClick={() => navigate(routePath)}
      size={ButtonSize.extraLarge}
    >
      {icon}
    </TMButton>
  );
};

export default TMSidebar;
