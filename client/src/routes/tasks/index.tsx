import { ReactElement } from 'react';

import TMLoader from 'components/tm_loader';
import { useTasks } from 'providers/tasks';

const TaskPage = (): ReactElement => {
  const { tags, tasks } = useTasks();
  return !tags || !tasks
    ? <TMLoader color='#99B83B' text='fetching user tasks...' />
    : (
      <div id='task-page' className='contents'>
      </div>
    );
};

export default TaskPage;
