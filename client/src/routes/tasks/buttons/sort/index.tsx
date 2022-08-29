import { FC } from 'react';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';

interface ISortButton {
  isAsc: boolean,
  updateSortOrder: (sortOrder: boolean) => void,
};

const SortButton: FC<ISortButton> = ({ isAsc, updateSortOrder }) => (
  <TMButton
    buttonStyle={ButtonStyle.icon}
    classNames={['task-toolbar-icon']}
    onClick={() => updateSortOrder(!isAsc)}
    size={ButtonSize.medium}
  >
    <TMTooltip
      content={<HotKeyTooltip action='Sort tasks by due date' keyStroke={['shift', 's']} />}
      direction={TooltipDirection.bottomLeft}
      id='sort-tasks-tooltip'
    >
      {isAsc ? <RiSortAsc /> : <RiSortDesc />}
    </TMTooltip>
  </TMButton>
);

export default SortButton;
