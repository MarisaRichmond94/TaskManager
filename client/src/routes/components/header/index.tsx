import './index.scss';

import { RichButton, RichButtonColor, RichButtonSize, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import logo from 'assets/logo/light.png';
import { useApp } from 'providers/app';
import { ROUTES } from 'settings/routes';
import { timedUserGreeting } from 'utils/user';

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
    <RichButton
      color={RichButtonColor.OffWhite}
      onClick={logout}
      size={RichButtonSize.Large}
      type={RichButtonType.Icon}
    >
      <IoLogOutOutline />
    </RichButton>
  );
};

export default Header;
