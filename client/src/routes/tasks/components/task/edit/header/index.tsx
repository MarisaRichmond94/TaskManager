import './index.scss';

import { FC } from 'react';
import { BsBookmarks, BsBookmarksFill, BsInboxes, BsTrash, BsXLg } from 'react-icons/bs';

import TMDropdown from 'components/tm_dropdown';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';
import TaskActionButton from 'routes/tasks/components/task/action_button';

const Header: FC = () => {
  const { archiveTaskById, deleteTaskById, statusTypes, updateActiveTaskId } = useTasks();
  const {  id, isArchived, isPinned, status, updateStatus, updateTask } = useTask();

  return (
    <div className='tm-task-header'>
      <TMDropdown
        onOptionSelect={(statusType: DropdownOption) => updateStatus(status.id, statusType.id)}
        options={statusTypes.map(s => { return { id: s.id, displayName: s.name } })}
        selectedOption={{ id: status.id, displayName: status.name }}
      />
      <div className='tm-task-menu'>
        <TaskActionButton
          action={() => updateTask({ isPinned: !isPinned })}
          icon={isPinned ? <BsBookmarksFill /> : <BsBookmarks />}
        />
        <TaskActionButton
          action={() => archiveTaskById(id)}
          icon={<BsInboxes />}
          isDisabled={isArchived}
        />
        <TaskActionButton
          action={() => deleteTaskById(id)}
          icon={<BsTrash />}
        />
        <TaskActionButton
          action={() => updateActiveTaskId()}
          icon={<BsXLg />}
        />
      </div>
    </div>
  );
};

export default Header;
