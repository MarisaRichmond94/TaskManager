import './index.scss';

import { RichButton, RichButtonSize, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC } from 'react';
import { BsChevronDoubleLeft } from 'react-icons/bs';

import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';

interface IToggleToolbarButton {
  showToolbar: boolean,
  setShowToolbar: (showToolbar: boolean) => void,
};

const ToggleToolbarButton: FC<IToggleToolbarButton> = ({ showToolbar, setShowToolbar }) => (
  <RichButton
    classNames={['task-toolbar-icon']}
    onClick={() => setShowToolbar(!showToolbar)}
    size={RichButtonSize.Small}
    type={RichButtonType.Icon}
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
  </RichButton>
);

export default ToggleToolbarButton;
