import './index.scss';

import { FC } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import logo from 'assets/logo/light.png';
import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import { useApp } from 'providers';
import { ROUTES } from 'settings';
import { timedUserGreeting } from 'utils';

const Header: FC = () => (
  <div id='app-header'>
    <Logo />
    <div className='control-panel'>
      <Greeting />
      <LogOutButton />
    </div>
  </div>
);

const Logo: FC = () => {
  const navigate = useNavigate();

  return <img alt='' src={logo} onClick={() => navigate(ROUTES.rootRoute)} />;
};

const Greeting: FC = () => {
  const { user } = useApp();

  if (!user) return;

  return (
    <p className='sub-header-text'>
      {timedUserGreeting(user.firstName)}
    </p>
  );
};

const LogOutButton: FC = () => {
  const { logout } = useApp();

  return (
    <TMButton
      classNames={['off-white']}
      onClick={logout}
      size={ButtonSize.large}
      type={ButtonType.icon}
    >
      <IoLogOutOutline />
    </TMButton>
  );
};

export default Header;
