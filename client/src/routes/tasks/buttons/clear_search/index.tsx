import { RichButton, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC } from 'react';
import { BsStars } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';

const ClearSearchButton: FC = () => {
  const navigate = useNavigate();

  return (
    <RichButton
      classNames={['task-toolbar-icon']}
      onClick={() => navigate({ search: '' })}
      type={RichButtonType.Icon}
    >
      <TMTooltip
        content={<HotKeyTooltip action='Clear all filters' keyStroke={['shift', 'w']} />}
        direction={TooltipDirection.bottomLeft}
        id='clear-all-filters-tooltip'
      >
        <BsStars />
      </TMTooltip>
    </RichButton>
  );
};

export default ClearSearchButton;
