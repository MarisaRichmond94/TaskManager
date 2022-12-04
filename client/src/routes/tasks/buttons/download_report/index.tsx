import { FC } from 'react';
import { FaDownload } from 'react-icons/fa';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';
import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';

const DownloadReportButton: FC = () => {
  return (
    <TMButton
      buttonStyle={ButtonStyle.icon}
      classNames={['task-toolbar-icon']}
      onClick={() => console.log('feature under construction')} // TODO - complete this as part of future feature
      size={ButtonSize.small}
    >
      <TMTooltip
        content={<HotKeyTooltip action='Download report' keyStroke={['shift', 'd']} />}
        direction={TooltipDirection.bottomLeft}
        id='export-report-tooltip'
      >
        <FaDownload />
      </TMTooltip>
    </TMButton>
  )
};

export default DownloadReportButton;
