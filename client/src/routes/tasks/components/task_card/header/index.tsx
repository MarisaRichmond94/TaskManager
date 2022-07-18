import './index.scss';

import { ReactElement } from 'react';
import { BsBookmarks, BsBookmarksFill, BsInboxes, BsTrash, BsXLg } from 'react-icons/bs';

import { TMButton } from 'components/tm_button';
import TMDropdown from 'components/tm_dropdown';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';

interface HeaderProps {
  isArchived: boolean,
  isPinned: boolean,
  status: Status,
};

const Header = ({ isArchived, isPinned, status }: HeaderProps): ReactElement => {
  const { statusTypes } = useTasks();
  const { archiveTask, deleteTask, updateStatus, updateTask } = useTask();

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
          action={archiveTask}
          icon={<BsInboxes />}
          isDisabled={isArchived}
        />
        <TaskActionButton
          action={deleteTask}
          icon={<BsTrash />}
        />
        <TaskActionButton
          action={() => console.log('this should exit task view')}
          icon={<BsXLg />}
        />
      </div>
    </div>
  );
};

interface TaskActionButtonProps {
  action: () => void,
  icon: ReactElement,
  isDisabled?: boolean,
};

const TaskActionButton = ({
  action,
  icon,
  isDisabled = false,
}: TaskActionButtonProps): ReactElement => (
  <TMButton
    buttonStyle='icon'
    classNames={['off-black']}
    isDisabled={isDisabled}
    onClick={action}
    size='medium'
  >
    {icon}
  </TMButton>
);

export default Header;
