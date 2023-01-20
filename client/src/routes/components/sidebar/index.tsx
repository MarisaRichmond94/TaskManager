import './index.scss';

import { RichButton, RichButtonSize, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC, ReactElement } from 'react';
import { BsTrophyFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';

import { TMToggleButton } from 'components/tm_toggle';
import { useApp } from 'providers/app';
import { ROUTES } from 'settings/routes';

const TMSidebar: FC = () => (
  <div id='app-sidebar'>
    <TopMenu />
    <BottomMenu />
  </div>
);

const TopMenu: FC = () => {
  const { isExpanded, user, toggleIsExpanded } = useApp();

  return (
    <div className='top-menu'>
      <img alt='' src={user?.avatar} referrerPolicy='no-referrer' />
      <TMToggleButton onClick={toggleIsExpanded} selected={isExpanded} />
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
    <RichButton
      classNames={['sidebar-menu-button', path === routePath ? 'active' : '']}
      onClick={() => navigate(routePath)}
      size={RichButtonSize.ExtraLarge}
      type={RichButtonType.Icon}
    >
      {icon}
    </RichButton>
  );
};

export default TMSidebar;
