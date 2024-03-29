import { FC, ReactElement } from "react";

import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';

interface ActionButtonProps {
  action: (event: any) => void,
  icon: ReactElement,

  isDisabled?: boolean,
};

const ActionButton: FC<ActionButtonProps> = ({
  action,
  icon,

  isDisabled = false,
}) => (
  <TMButton
    classNames={['off-black']}
    isDisabled={isDisabled}
    onClick={action}
    size={ButtonSize.medium}
    type={ButtonType.icon}
  >
    {icon}
  </TMButton>
);

export default ActionButton
