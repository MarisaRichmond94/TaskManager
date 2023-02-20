import './index.scss';

import { FC } from 'react';
import { BsChevronDoubleLeft } from 'react-icons/bs';

import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';

interface IToggleToolbarButton {
  showToolbar: boolean,
  setShowToolbar: (showToolbar: boolean) => void,
};

const ToggleToolbarButton: FC<IToggleToolbarButton> = ({ showToolbar, setShowToolbar }) => (
  <TMButton
    type={ButtonType.icon}
    classNames={['task-toolbar-icon']}
    onClick={() => setShowToolbar(!showToolbar)}
    size={ButtonSize.small}
  >
    <TMTooltip
      content={showToolbar ? 'Hide menu' : 'Show menu'}
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

export default ToggleToolbarButton;
