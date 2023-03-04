import './CreateTask.scss';

import { FC } from 'react';
import { IoMdAdd } from 'react-icons/io';

import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';

interface CreateTaskButtonProps {
  isModalOpen: boolean,
  setIsModalOpen: (isModalOpen: boolean) => void,
};

const CreateTaskButton: FC<CreateTaskButtonProps> = ({ isModalOpen, setIsModalOpen }) => (
  <TMButton
    classNames={['task-toolbar-icon']}
    id='create-task-button'
    onClick={() => setIsModalOpen(!isModalOpen)}
    size={ButtonSize.large}
    type={ButtonType.icon}
  >
    <TMTooltip
      content={<HotKeyTooltip action='Create new task' keyStroke={['shift', 'n']} />}
      direction={TooltipDirection.bottomLeft}
      id='create-new-task-tooltip'
    >
      <IoMdAdd className={isModalOpen ? 'active' : ''} id='create-task-icon' />
    </TMTooltip>
  </TMButton>
);

export default CreateTaskButton;
