import './index.scss';

import { FC, useCallback, useState } from 'react';

import TMOverlay from 'components/tm_overlay/Overlay.component';
import { useSearchTasks } from 'providers/search/tasks';
import ClearSearchButton from 'routes/tasks/buttons/clear_search';
import CreateTaskButton from 'routes/tasks/buttons/create_task';
import FilterMenuButton from 'routes/tasks/buttons/filter_menu';
import MenuButton from 'routes/tasks/buttons/menu';
import SortButton from 'routes/tasks/buttons/sort';
import CreateTaskModal from 'routes/tasks/task/create_modal';

const Toolbar: FC = () => {
  const { isAsc, updateSortOrder } = useSearchTasks();

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const onCancelCallback = useCallback(() => {  setIsCreateTaskModalOpen(false); }, []);

  return (
    <div id='task-header-toolbar'>
      <SortButton isAsc={isAsc} updateSortOrder={updateSortOrder} />
      <FilterMenuButton />
      <ClearSearchButton />
      <CreateTaskButton isModalOpen={isCreateTaskModalOpen} setIsModalOpen={setIsCreateTaskModalOpen} />
      <MenuButton />
      {
        isCreateTaskModalOpen &&
        (
          <>
            <CreateTaskModal onCancelCallback={onCancelCallback} />
            <TMOverlay onCloseCallback={onCancelCallback} />
          </>
        )
      }
    </div>
  );
};

export default Toolbar;
