import { FC } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import TMCheckbox from 'components/tm_checkbox';
import TMMenu from 'components/tm_menu';
import { useTasks } from 'providers/tasks';

const MenuButton: FC = () => {
  const { isShowingArchivedTasks, updateIsShowingArchivedTasks } = useTasks();

  return (
    <TMMenu
      id='toolbar-menu'
      menuContent={
        <div className='menu-item'>
          <TMCheckbox
            classNames={['task-menu-item']}
            isActive={isShowingArchivedTasks}
            textBlock='show archived'
            toggleIsActive={() => updateIsShowingArchivedTasks(!isShowingArchivedTasks)}
          />
        </div>
      }
    >
      <TMButton
        buttonStyle={ButtonStyle.icon}
        classNames={['task-toolbar-icon']}
        onClick={() => {}}
        size={ButtonSize.large}
      >
        <AiOutlineMenu />
      </TMButton>
    </TMMenu>
  );
};

export default MenuButton;
