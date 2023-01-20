import { RichButton, RichButtonSize, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC } from 'react';
import { FaDownload } from 'react-icons/fa';

import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';

const DownloadReportButton: FC = () => {
  return (
    <RichButton
      classNames={['task-toolbar-icon']}
      onClick={() => console.log('feature under construction')} // TODO - complete this as part of future feature
      size={RichButtonSize.Small}
      type={RichButtonType.Icon}
    >
      <TMTooltip
        content={<HotKeyTooltip action='Download report' keyStroke={['shift', 'd']} />}
        direction={TooltipDirection.bottomLeft}
        id='export-report-tooltip'
      >
        <FaDownload />
      </TMTooltip>
    </RichButton>
  )
};

export default DownloadReportButton;
