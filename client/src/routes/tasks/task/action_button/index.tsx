import { FC, ReactElement } from "react";

import TMButton, { ButtonSize, ButtonStyle } from "components/tm_button";

interface ITaskActionButton {
  action: (event: any) => void,
  icon: ReactElement,
  isDisabled?: boolean,
};

const TaskActionButton: FC<ITaskActionButton> = ({
  action,
  icon,
  isDisabled = false,
}) => (
  <TMButton
    buttonStyle={ButtonStyle.icon}
    classNames={['off-black']}
    isDisabled={isDisabled}
    onClick={action}
    size={ButtonSize.medium}
  >
    {icon}
  </TMButton>
);

export default TaskActionButton
