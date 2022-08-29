import './index.scss';

import { FC, useEffect, useRef } from 'react';

import TMUncontrolledCollapsableSection from 'components/tm_collapsable_section/uncontrolled';
import { SectionHotkeysProvider } from 'providers/hotkeys/task_section';
import { useSections } from 'providers/task_sections';
import TaskCard from 'routes/tasks/task';
import { SectionType } from 'types/constants';

interface ISection {
  emptyResponseText: string,
  tasks: Task[],
  title: string,
  total: number,
  type: string,
};

const Section: FC<ISection> = ({
  emptyResponseText,
  tasks,
  title,
  total,
  type,
}) => {
  const { activeSection, collapseState, toggleSectionCollapseState } = useSections();
  const isVisible = collapseState.get(type);
  const sectionRef = useRef(null);

  // if section is active, scroll section into view
  useEffect(() => {
    if (activeSection === type && sectionRef.current) sectionRef.current.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  const buildSectionContent = () => {
    const emptySectionContent = (
      <div className='header-text empty-section'>
        {emptyResponseText}
      </div>
    );

    return !tasks.length
      ? emptySectionContent
      : tasks.map(task => <TaskCard task={task} key={`task-${task.id}`} />)
  };

  return (
    <SectionHotkeysProvider sectionType={type as SectionType}>
      <div ref={sectionRef}>
        <TMUncontrolledCollapsableSection
          classNames={['section', 'off-white', activeSection === type ? 'active' : '']}
          id={`${type.toLowerCase()}-collapsable`}
          isVisible={isVisible}
          rightBlock={<p className='task-count'>({total})</p>}
          sectionTitle={title}
          setIsVisible={() => toggleSectionCollapseState(type)}
          wholeHeaderClickable
        >
          <div className='tasks-container'>
            <div className='header-text task-section'>
              {buildSectionContent()}
            </div>
          </div>
        </TMUncontrolledCollapsableSection>
      </div>
    </SectionHotkeysProvider>
  );
};

export default Section;
