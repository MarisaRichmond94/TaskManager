import './Tasks.scss';

import { FC } from 'react';

import TMLoader from 'components/tm_loader';
import { SectionsHotkeysProvider, SectionsProvider, useTasks } from 'providers';
import { buildSections } from 'routes/tasks';

interface TasksProps {
  height: string,
};

const Tasks: FC<TasksProps> = ({ height }) => {
  const { isShowingArchivedTasks, taskMap } = useTasks();

  return (
    taskMap
      ? (
        <SectionsProvider>
          <SectionsHotkeysProvider>
            <div className='tm-panel' id='tasks' style={{ height }}>
              {buildSections(taskMap, isShowingArchivedTasks)}
            </div>
          </SectionsHotkeysProvider>
        </SectionsProvider>
      )
      : <TMLoader color='#99B83B' text='categorizing tasks...' />
  );
};

export default Tasks;
