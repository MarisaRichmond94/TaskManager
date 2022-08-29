import { FC } from 'react';
import { IoMdAdd } from 'react-icons/io';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';
import { useTasks } from 'providers/tasks';

const CreateTaskButton: FC = () => {
  const { createTask } = useTasks();

  return (
    <TMButton
      buttonStyle={ButtonStyle.icon}
      classNames={['task-toolbar-icon']}
      onClick={createTask}
      size={ButtonSize.large}
    >
      <TMTooltip
        content={<HotKeyTooltip action='Create new task' keyStroke={['shift', 'n']} />}
        direction={TooltipDirection.bottomLeft}
        id='create-new-task-tooltip'
      >
        <IoMdAdd />
      </TMTooltip>
    </TMButton>
  );
};

export default CreateTaskButton;
