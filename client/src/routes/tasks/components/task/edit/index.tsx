import './index.scss';

import { FC } from 'react';

import Body from 'routes/tasks/components/task/edit/body';
import Header from 'routes/tasks/components/task/edit/header';
import Sidebar from 'routes/tasks/components/task/edit/sidebar';

const EditTaskCard: FC = () => {

  return (
    <div className='edit-task-card'>
      <Header />
      <div className='task-content-container'>
        <Body />
        <Sidebar />
      </div>
    </div>
  );
};

export default EditTaskCard;
