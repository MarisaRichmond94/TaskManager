import './index.scss';

import { AiOutlineMenu } from 'react-icons/ai';
import { BiMessage } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import logo from 'assets/logo_light.png';
import { TMButton } from 'components/tm_button';
import { ROOT_ROUTE } from 'settings';

const TMHeader: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

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
