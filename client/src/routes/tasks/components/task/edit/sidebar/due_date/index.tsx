import { FC, ReactElement } from 'react';

import { TMCollapsableSection } from 'components/tm_collapsable_section';
import TMDatePicker from 'components/tm_date_picker';
import { useTask } from 'providers/task';
import { toServerDatetime, toClientDatetime } from 'utils/date';

interface ITaskDueDateProps {
  dueDate: number,
  id: string,
};

const TaskDueDate: FC<ITaskDueDateProps> = ({ dueDate, id }): ReactElement => {
  const { task, updateTask } = useTask();

  const updateDueDate = (date: Date) => updateTask({ dueDate: toServerDatetime(date) });

  return (
    <TMCollapsableSection
      classNames={['off-black', 'task-section', 'task-due-date-section']}
      id={`task-card-${id}-attachments`}
      initiallyVisible
      sectionTitle='Due Date'
    >
      <TMDatePicker
        date={toClientDatetime(task.dueDate)}
        onChange={(date: Date) => updateDueDate(date)}
        showTimeSelect
      />
    </TMCollapsableSection>
  );
};

export default TaskDueDate;
