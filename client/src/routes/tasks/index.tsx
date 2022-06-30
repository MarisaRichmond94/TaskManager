import TMLoader from 'components/tm_loader';
import { useTasks } from 'providers/tasks';
import Header from 'routes/tasks/components/header';

const TaskPage: React.FC = (): JSX.Element => {
  const { tags, tasks } = useTasks();
  return !tags || !tasks
    ? <TMLoader color='#99B83B' text='fetching user tasks...' />
    : (
      <div id='task-page' className='contents'>
        <Header />
      </div>
    );
};

export default TaskPage;
