import './index.scss';

import { FC, useEffect, useState } from 'react';

import TMUncontrolledCollapsableSection from 'components/tm_collapsable_section/uncontrolled';
import { useTasks } from 'providers/tasks';
import TaskCard from 'routes/tasks/components/task';

interface ITasksSection {
  emptyResponseText: string,
  initiallyVisible?: boolean,
  tasks: Task[],
  title: string,
  total: number,
  type: string,
};

const TasksSection: FC<ITasksSection> = ({
  emptyResponseText,
  initiallyVisible = false,
  tasks,
  title,
  total,
  type,
}) => {
  const { activeTaskId } = useTasks();
  const [isVisible, setIsVisible] = useState(initiallyVisible || !!tasks.length);

  useEffect(() => {
    if (tasks?.find(x => x.id === activeTaskId)) setIsVisible(true);
    if (!tasks.length) setIsVisible(false);
  }, [activeTaskId, tasks]);

  tasks?.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));

  return (
    <TMUncontrolledCollapsableSection
      classNames={['off-white']}
      id={`${type}-collapsable`}
      isVisible={isVisible}
      rightBlock={<p className='task-count'>({total})</p>}
      sectionTitle={title}
      setIsVisible={setIsVisible}
      wholeHeaderClickable
    >
      <div className='tasks-container'>
        <div className='header-text task-section'>
          {
            !tasks.length
              ? (
                <div className='header-text empty-task-section'>
                  {emptyResponseText}
                </div>
              )
              : tasks.map(task => <TaskCard task={task} key={`task-${task.id}`} />)
          }
        </div>
      </div>
    </TMUncontrolledCollapsableSection>
  );
};

export default TasksSection;
