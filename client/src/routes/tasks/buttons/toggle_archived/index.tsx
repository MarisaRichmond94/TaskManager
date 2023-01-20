import { RichButton, RichButtonSize, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC } from 'react';
import { ImFolder, ImFolderOpen } from 'react-icons/im';

import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';
import { useTasks } from 'providers/tasks';

const ToggleArchivedButton: FC = () => {
  const { isShowingArchivedTasks, updateIsShowingArchivedTasks } = useTasks();

  return (
    <RichButton
      classNames={['task-toolbar-icon']}
      onClick={() => updateIsShowingArchivedTasks(!isShowingArchivedTasks)}
      size={RichButtonSize.Small}
      type={RichButtonType.Icon}
    >
      <TMTooltip
        content='Show archived tasks'
        direction={TooltipDirection.bottomLeft}
        id='toggle-archived-tasks-tooltip'
      >
        {isShowingArchivedTasks ? <ImFolderOpen /> : <ImFolder />}
      </TMTooltip>
    </RichButton>
  );
};

export default ToggleArchivedButton;
