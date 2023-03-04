import './index.scss';

import { FC } from 'react';

interface HotKeyTooltipProps {
  action: string,
  keyStroke: string[],
};

const HotKeyTooltip: FC<HotKeyTooltipProps> = ({ action, keyStroke }) => {
  const hotkey = keyStroke.join(' + ').split(' ');

  return (
    <span className='hotkey-tooltip-content'>
      <span className='hotkey-tooltip-action'>
        {`${action}:`}
      </span>
      {
        hotkey.map((key, index) =>
          <span key={`${key}-tip-${index}`} className={key === '+' ? 'plus' : 'keystroke'}>
            {key}
          </span>
        )
      }
    </span>
  );
};

export default HotKeyTooltip;
