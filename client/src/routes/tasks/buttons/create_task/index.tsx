import './index.scss';

import { RichButton, RichButtonSize, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC } from 'react';
import { IoMdAdd } from 'react-icons/io';

import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';

interface ICreateTaskButton {
  isModalOpen: boolean,
  setIsModalOpen: (isModalOpen: boolean) => void,
};

const CreateTaskButton: FC<ICreateTaskButton> = ({ isModalOpen, setIsModalOpen }) => (
  <RichButton
    classNames={['task-toolbar-icon']}
    id='create-task-button'
    onClick={() => setIsModalOpen(!isModalOpen)}
    size={RichButtonSize.Large}
    type={RichButtonType.Icon}
  >
    <TMTooltip
      content={<HotKeyTooltip action='Create new task' keyStroke={['shift', 'n']} />}
      direction={TooltipDirection.bottomLeft}
      id='create-new-task-tooltip'
    >
      <IoMdAdd className={isModalOpen ? 'active' : ''} id='create-task-icon' />
    </TMTooltip>
  </RichButton>
);

export default CreateTaskButton;
