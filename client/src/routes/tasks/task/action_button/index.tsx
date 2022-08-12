import { ReactElement } from "react";

import TMButton, { ButtonSize, ButtonStyle } from "components/tm_button";

interface TaskActionButtonProps {
  action: (event: any) => void,
  icon: ReactElement,
  isDisabled?: boolean,
};

const TaskActionButton = ({
  action,
  icon,
  isDisabled = false,
}: TaskActionButtonProps): ReactElement => (
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
