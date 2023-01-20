import { RichButton, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC } from 'react';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';

import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';
import { useSearchTasks } from 'providers/search/tasks';

const SortButton: FC = () => {
  const { isAsc, updateSortOrder } = useSearchTasks();

  return (
    <RichButton
      classNames={['task-toolbar-icon']}
      onClick={() => updateSortOrder(!isAsc)}
      type={RichButtonType.Icon}
    >
      <TMTooltip
        content={<HotKeyTooltip action='Sort tasks by due date' keyStroke={['shift', 's']} />}
        direction={TooltipDirection.bottomLeft}
        id='sort-tasks-tooltip'
      >
        {isAsc ? <RiSortAsc /> : <RiSortDesc />}
      </TMTooltip>
    </RichButton>
  );
};

export default SortButton;
