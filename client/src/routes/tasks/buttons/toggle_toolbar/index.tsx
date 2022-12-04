import './index.scss';

import { FC } from 'react';
import { BsChevronDoubleLeft } from 'react-icons/bs';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';

interface IToggleToolbarButton {
  showToolbar: boolean,
  setShowToolbar: (showToolbar: boolean) => void,
};

const ToggleToolbarButton: FC<IToggleToolbarButton> = ({ showToolbar, setShowToolbar }) => {
  return (
    <TMButton
      buttonStyle={ButtonStyle.icon}
      classNames={['task-toolbar-icon']}
      onClick={() => setShowToolbar(!showToolbar)}
      size={ButtonSize.small}
    >
      <TMTooltip
        content='Show/hide toolbar menu'
        direction={TooltipDirection.bottomLeft}
        id='show-hide-toolbar-menu-tooltip'
      >
        <BsChevronDoubleLeft
          className={[showToolbar ? 'show-toolbar' : 'hide-toolbar'].join(' ')}
          id='toggle-toobar-button'
        />
      </TMTooltip>
    </TMButton>
  );
};

export default ToggleToolbarButton;
