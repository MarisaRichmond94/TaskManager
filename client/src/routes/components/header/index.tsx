import './index.scss';

import { AiOutlineMenu } from 'react-icons/ai';
import { BiMessage } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import logo from 'assets/logo_light.png';
import { TMButton } from 'components/tm_button';
import { useApp } from 'providers/app';
import { ROOT_ROUTE } from 'settings';

const TMHeader: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useApp();

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
          onClick={() => navigate(ROOT_ROUTE)}
        />
      </div>
      <div id='control-panel-container'>
        {user && <p className='sub-header-text'>{generateMessage()}</p>}
        <TMButton
          classNames={['off-white']}
          buttonStyle='icon'
          onClick={() => console.log('message')}
          size='large'
        >
          <BiMessage />
        </TMButton>
        <TMButton
          classNames={['off-white']}
          buttonStyle='icon'
          onClick={() => console.log('menu')}
          size='large'
        >
          <AiOutlineMenu />
        </TMButton>
      </div>
    </div>
  );
};

export default TMHeader;
