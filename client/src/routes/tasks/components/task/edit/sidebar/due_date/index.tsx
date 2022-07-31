import './index.scss';

import { FC } from 'react';

import TMControlledCollapsableSection from 'components/tm_collapsable_section/controlled';
import TMDatePicker from 'components/tm_date_picker';
import { useTask } from 'providers/task';
import { toServerDatetime, toClientDatetime } from 'utils/date';

const TaskDueDate: FC = () => {
  const { dueDate, id, updateTask } = useTask();

  const updateDueDate = (date: Date) => updateTask({ dueDate: toServerDatetime(date) });

  return (
    <TMControlledCollapsableSection
      classNames={['off-black', 'task-section', 'task-due-date-section']}
      id={`task-card-${id}-attachments`}
      initiallyVisible
      sectionTitle='Due Date'
    >
      <TMDatePicker
        date={toClientDatetime(dueDate)}
        onChange={(date: Date) => updateDueDate(date)}
        showTimeSelect
      />
    </TMControlledCollapsableSection>
  );
};

export default TaskDueDate;
