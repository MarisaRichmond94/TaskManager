import { FC } from 'react';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';

import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';
import { useSearchTasks } from 'providers/search/tasks';

const SortButton: FC = () => {
  const { isAsc, updateSortOrder } = useSearchTasks();

  return (
    <TMButton
      type={ButtonType.icon}
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
};

export default SortButton;
