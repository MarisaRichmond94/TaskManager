import { FC } from 'react';
import { ImFolder, ImFolderOpen } from 'react-icons/im';

import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';
import { useTasks } from 'providers';

const ToggleArchivedButton: FC = () => {
  const { isShowingArchivedTasks, updateIsShowingArchivedTasks } = useTasks();

  return (
    <TMButton
      type={ButtonType.icon}
      classNames={['task-toolbar-icon']}
      onClick={() => updateIsShowingArchivedTasks(!isShowingArchivedTasks)}
      size={ButtonSize.small}
    >
      <TMTooltip
        content='Show archived tasks'
        direction={TooltipDirection.bottomLeft}
        id='toggle-archived-tasks-tooltip'
      >
        {isShowingArchivedTasks ? <ImFolderOpen /> : <ImFolder />}
      </TMTooltip>
    </TMButton>
  )
};

export default ToggleArchivedButton;
