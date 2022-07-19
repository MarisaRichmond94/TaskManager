import './index.scss';
import "react-datepicker/dist/react-datepicker.css";

import { ReactElement } from 'react';
import DatePicker from 'react-datepicker';

import { TMCollapsableSection } from 'components/tm_collapsable_section';
import { useTask } from 'providers/task';

const TaskDueDate = (): ReactElement => {
  const { task, updateTask } = useTask();
  const { dueDate, id } = task;

  return (
    <TMCollapsableSection
      classNames={['off-black', 'task-section', 'task-due-date-section']}
      id={`task-card-${id}-attachments`}
      initiallyVisible
      sectionTitle='Due Date'
    >
      <DatePicker
        selected={new Date(dueDate)}
        onChange={(date: Date) => updateTask({ dueDate: date.toISOString() })}
      />
    </TMCollapsableSection>
  );
};

export default TaskDueDate;
