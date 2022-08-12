import './index.scss';

import { FC } from 'react';
import ReactLoading from 'react-loading';

interface ITMLoader {
  color?: string,
  height?: string,
  text?: string,
  type?: any,
  width?: string,
};

const TMLoader: FC<ITMLoader> = ({ color, height, text, type, width }) => (
  <div className='tm-loader-container'>
    <ReactLoading
      className='tm-loader'
      color={color || '#083F89'}
      height={height || '10%'}
      type={type || 'cylon'}
      width={width || '20%'}
    />
    {
      text &&
      <p className='tm-loader-text header-text'>
        {text}
      </p>
    }
  </div>
);

export default TMLoader;
