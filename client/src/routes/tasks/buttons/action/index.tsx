import { RichButton, RichButtonColor, RichButtonType } from '@MarisaRichmond94/rich_ui';
import { FC, ReactElement } from 'react';

interface IActionButton {
  action: (event: any) => void,
  icon: ReactElement,

  isDisabled?: boolean,
};

const ActionButton: FC<IActionButton> = ({
  action,
  icon,

  isDisabled = false,
}) => (
  <RichButton
    color={RichButtonColor.OffBlack}
    isDisabled={isDisabled}
    onClick={action}
    type={RichButtonType.Icon}
  >
    {icon}
  </RichButton>
);

export default ActionButton
