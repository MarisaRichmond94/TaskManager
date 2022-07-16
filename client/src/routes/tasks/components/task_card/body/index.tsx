import './index.scss';

import { ReactElement } from 'react';

import { TMCollapsableSection } from 'components/tm_collapsable_section';

interface BodyProps {
  id: string,
  checklistItems?: ChecklistItem[],
  comments?: Comment[],
  description?: string,
  objective?: string,
};

const Body = ({ id, checklistItems, comments, description, objective }: BodyProps): ReactElement => {
  const completed = checklistItems.filter(x => x.isCompleted).length;
  const total = checklistItems.length;

  return (
    <div className='tm-task-body'>
      <div className='large-header-text task-objective'>
        <b>{objective}</b>
      </div>
      <div className='header-text'>{description}</div>
      {/* <TMCollapsableSection
        classNames={['unlined-task-card-section']}
        id={`task-${id}-checklist-items`}
        initiallyVisible
        sectionTitle={`Checklist Items (${completed}/${total})`}
        onToggleCallback={() => console.log('should toggle')}
      >
        <div>TODO</div>
      </TMCollapsableSection> */}
    </div>
  );
};

export default Body;
