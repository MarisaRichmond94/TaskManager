import './index.scss';

import { FC } from 'react';
import { BsBookmarks, BsBookmarksFill, BsInboxes, BsTrash, BsXLg } from 'react-icons/bs';

import TMDropdown from 'components/tm_dropdown';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';
import ActionButton from 'routes/tasks/buttons/action';
import { ARCHIVED_TASK_STATUS_NAMES } from 'settings/task';

const Header: FC = () => {
  const { archiveTaskById, deleteTaskById, statusTypes, updateActiveTaskId } = useTasks();
  const {  id, isPinned, status, updateStatus, updateTask } = useTask();

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
          icon={isPinned ? <BsBookmarksFill /> : <BsBookmarks />}
        />
        <ActionButton
          action={() => archiveTaskById(id)}
          icon={<BsInboxes />}
          isDisabled={ARCHIVED_TASK_STATUS_NAMES.includes(status.name)}
        />
        <ActionButton
          action={() => deleteTaskById(id)}
          icon={<BsTrash />}
        />
        <ActionButton
          action={() => updateActiveTaskId(undefined)}
          icon={<BsXLg />}
        />
      </div>
    </div>
  );
};

export default Header;
