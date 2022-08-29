import './index.scss';

import { FC } from 'react';

import { useSearchTasks } from 'providers/search/tasks';
import ClearSearchButton from 'routes/tasks/buttons/clear_search';
import CreateTaskButton from 'routes/tasks/buttons/create_task';
import FilterMenuButton from 'routes/tasks/buttons/filter_menu';
import MenuButton from 'routes/tasks/buttons/menu';
import SortButton from 'routes/tasks/buttons/sort';

const Toolbar: FC = () => {
  const { isAsc, updateSortOrder } = useSearchTasks();

  return (
    <div id='task-header-toolbar'>
      <SortButton isAsc={isAsc} updateSortOrder={updateSortOrder} />
      <FilterMenuButton />
      <ClearSearchButton />
      <CreateTaskButton />
      <MenuButton />
    </div>
  );
};

export default Toolbar;
