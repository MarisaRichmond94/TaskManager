import { ReactElement } from "react";

import { TMButton } from "components/tm_button";

interface TaskActionButtonProps {
  action: () => void,
  icon: ReactElement,
  isDisabled?: boolean,
};

const TaskActionButton = ({
  action,
  icon,
  isDisabled = false,
}: TaskActionButtonProps): ReactElement => (
  <TMButton
    buttonStyle='icon'
    classNames={['off-black']}
    isDisabled={isDisabled}
    onClick={action}
    size='medium'
  >
    {icon}
  </TMButton>
);

export default TaskActionButton
