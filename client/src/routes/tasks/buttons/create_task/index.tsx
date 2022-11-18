import { FC, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';
import CreateTaskModal from 'routes/tasks/task/create_modal';

const CreateTaskButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TMButton
      buttonStyle={ButtonStyle.icon}
      classNames={['task-toolbar-icon']}
      onClick={() => setIsModalOpen(!isModalOpen)}
      size={ButtonSize.large}
    >
      <TMTooltip
        content={<HotKeyTooltip action='Create new task' keyStroke={['shift', 'n']} />}
        direction={TooltipDirection.bottomLeft}
        id='create-new-task-tooltip'
      >
        <IoMdAdd />
      </TMTooltip>
      {isModalOpen && <CreateTaskModal />}
    </TMButton>
  );
};

export default CreateTaskButton;
