import { FC } from 'react';
import { BsStars } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';

const ClearSearchButton: FC = () => {
  const navigate = useNavigate();

  return (
    <TMButton
      buttonStyle={ButtonStyle.icon}
      classNames={['task-toolbar-icon']}
      onClick={() => navigate({ search: '' })}
      size={ButtonSize.medium}
    >
      <TMTooltip
        content={<HotKeyTooltip action='Clear all filters' keyStroke={['shift', 'w']} />}
        direction={TooltipDirection.bottomLeft}
        id='clear-all-filters-tooltip'
      >
        <BsStars />
      </TMTooltip>
    </TMButton>
  );
};

export default ClearSearchButton;
