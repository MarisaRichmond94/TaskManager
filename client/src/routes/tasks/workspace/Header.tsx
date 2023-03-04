import './Header.scss';

import { FC } from 'react';
import { BsBookmarks, BsBookmarksFill, BsInboxes, BsTrash, BsXLg } from 'react-icons/bs';

import TMDropdown from 'components/tm_dropdown';
import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';
import { useTask, useTasks } from 'providers';
import { ActionButton } from 'routes/tasks';
import { ARCHIVED_TASK_STATUS_NAMES } from 'settings';

const Header: FC = () => {
  const { statusTypes, archiveTaskById, deleteTaskById, updateActiveTaskId } = useTasks();
  const {  id, isPinned, status, updateStatus, updateTask } = useTask();

  const pinTaskTooltip = (
    <TMTooltip
      content={<HotKeyTooltip action='Pin/unpin task' keyStroke={['shift', 'p']} />}
      direction={TooltipDirection.bottomLeft}
      id='pin-task-tooltip'
    >
      {isPinned ? <BsBookmarksFill /> : <BsBookmarks />}
    </TMTooltip>
  );

  const archiveTaskTooltip = (
    <TMTooltip
      content={<HotKeyTooltip action='Archive task' keyStroke={['shift', 'a']} />}
      direction={TooltipDirection.bottomLeft}
      id='archive-task-tooltip'
    >
      <BsInboxes />
    </TMTooltip>
  );

  const deleteTaskByIdTooltip = (
    <TMTooltip
      content={<HotKeyTooltip action='Delete task' keyStroke={['shift', 'k']} />}
      direction={TooltipDirection.bottomLeft}
      id='delete-task-by-id-tooltip'
    >
      <BsTrash />
    </TMTooltip>
  );

  const closeActiveTaskTooltip = (
    <TMTooltip
      content={<HotKeyTooltip action='Close active task' keyStroke={['shift', 'x']} />}
      direction={TooltipDirection.bottomLeft}
      id='close-active-task-tooltip'
    >
      <BsXLg />
    </TMTooltip>
  );

  return (
    <div className='workspace-header'>
      <TMDropdown
        onOptionSelect={(statusType: DropdownOption) => updateStatus(status.id, statusType.id)}
        options={statusTypes.map(s => { return { id: s.id, displayName: s.name } })}
        selectedOption={{ id: status.id, displayName: status.name }}
      />
      <div className='workspace-menu'>
        <ActionButton
          action={() => updateTask({ isPinned: !isPinned })}
          icon={pinTaskTooltip}
        />
        <ActionButton
          action={() => archiveTaskById(id)}
          icon={archiveTaskTooltip}
          isDisabled={ARCHIVED_TASK_STATUS_NAMES.includes(status.name)}
        />
        <ActionButton
          action={() => deleteTaskById(id)}
          icon={deleteTaskByIdTooltip}
        />
        <ActionButton
          action={() => updateActiveTaskId(undefined)}
          icon={closeActiveTaskTooltip}
        />
      </div>
    </div>
  );
};

export default Header;
