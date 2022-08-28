import './index.scss';

import { BiMessage } from 'react-icons/bi';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import logo from 'assets/logo_light.png';
import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import { useApp } from 'providers/app';
import { ROUTES } from 'settings/routes';

const TMHeader: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const generateMessage = () => {
    const hours = new Date().getHours();
    switch (true) {
      case hours >= 6 && hours < 12:
        return `Good morning, ${user.firstName}`;
      case hours >= 12 && hours < 17:
        return `Good afternoon, ${user.firstName}`;
      case hours >= 17 && hours < 20:
        return `Good evening, ${user.firstName}`;
      default:
        return `Good night, ${user.firstName}`;
    }
  };

  return (
    <div id='tm-header'>
      <div className='title-container'>
        <img
          alt='task manager logo'
          className='app-logo'
          src={logo}
          onClick={() => navigate(ROUTES.rootRoute)}
        />
      </div>
      <div id='control-panel-container'>
        {user && <p className='sub-header-text'>{generateMessage()}</p>}
        <TMButton
          classNames={['off-white']}
          buttonStyle={ButtonStyle.icon}
          onClick={() => console.log('message')}
          size={ButtonSize.large}
        >
          <BiMessage />
        </TMButton>
        <TMButton
          classNames={['off-white']}
          buttonStyle={ButtonStyle.icon}
          onClick={logout}
          size={ButtonSize.large}
        >
          <IoLogOutOutline />
        </TMButton>
      </div>
    </div>
  );
};

export default TMHeader;
