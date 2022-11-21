import './index.scss';

import { FC, useCallback } from 'react';
import { BiMessage } from 'react-icons/bi';
import { IoLogOutOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import logo from 'assets/logo/light.png';
import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import TMToggleButton from 'components/tm_toggle';
import { useApp } from 'providers/app';
import { ROUTES } from 'settings/routes';
import { timedUserGreeting } from 'utils/user';

const Header: FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const toggleUseMock = useCallback(() => {
    const searchParams = new URLSearchParams(search);
    searchParams.get('useMock') ?? false
      ? searchParams.delete('useMock')
      : searchParams.set('useMock', 'true');
    navigate({ search: searchParams.toString() });
  }, [navigate, search]);

  return (
    <div id='app-header'>
      <Logo />
      <div className='control-panel'>
        {
          process.env.NODE_ENV === 'development' &&
          <TMToggleButton
            classNames={['use-mock-toggle-button']}
            onClick={toggleUseMock}
            selected={search.includes('useMock')}
          />
        }
        <Greeting />
        <MessageCenterButton />
        <LogOutButton />
      </div>
    </div>
  );
};

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

const MessageCenterButton: FC = () => (
  <TMButton
    classNames={['off-white']}
    buttonStyle={ButtonStyle.icon}
    onClick={() => console.log('message')}
    size={ButtonSize.large}
  >
    <BiMessage />
  </TMButton>
);

const LogOutButton: FC = () => {
  const { logout } = useApp();

  return (
    <TMButton
      classNames={['off-white']}
      buttonStyle={ButtonStyle.icon}
      onClick={logout}
      size={ButtonSize.large}
    >
      <IoLogOutOutline />
    </TMButton>
  );
};

export default Header;
