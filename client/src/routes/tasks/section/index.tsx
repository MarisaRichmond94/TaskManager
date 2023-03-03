import './index.scss';

import { FC, useEffect, useRef } from 'react';
import { BsListTask } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

import TMUncontrolledCollapsableSection from 'components/tm_collapsable_section/uncontrolled';
import { SectionHotkeysProvider } from 'providers';
import { useSections } from 'providers';
import TaskCard from 'routes/tasks/task';
import { SectionType } from 'enums';

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
  const { search } = useLocation();
  const isAscSorted = !!(new URLSearchParams(search).get('asc'))

  // if section is active, scroll section into view
  useEffect(() => {
    if (activeSection === type && sectionRef.current) sectionRef.current.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  const buildSectionContent = () => {
    const emptySectionContent = (
      <div className={['header-text', 'empty-section', 'text-center'].join(' ')}>
        <div>
          <BsListTask />
        </div>
        {emptyResponseText}
      </div>
    );

    /*
    Adds additional sort to tasks by priority. This will be applied on top of any additional sort.
    Whether or not more complicated logic needs to be implemented can be determined after this
    feature has been used
    */
    let prioritySortedTasks = tasks;
    if (!isAscSorted && prioritySortedTasks.length) {
      const [pinned, unpinned] = prioritySortedTasks.reduce((result, element) => {
        result[element.isPinned ? 0 : 1].push(element);
        return result;
      }, [[], []]);
      prioritySortedTasks = [...pinned, ...unpinned];
    }

    return !prioritySortedTasks.length
      ? emptySectionContent
      : prioritySortedTasks.map(task => <TaskCard task={task} key={`task-${task.id}`} />)
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
