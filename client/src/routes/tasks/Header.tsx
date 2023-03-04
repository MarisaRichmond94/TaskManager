import './Header.scss';

import { FC, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

import TMInput from 'components/tm_input';
import TMOverlay from 'components/tm_overlay/Overlay.component';
import { useSearchTasks } from 'providers';
import {
  ClearSearchButton,
  CreateTaskButton,
  CreateTaskModal,
  DownloadReportButton,
  FilterMenuButton,
  SortButton,
  ToggleArchivedButton,
  ToggleToolbarButton,
} from 'routes/tasks';

const TaskHeader: FC = () => (
  <div id='task-header'>
    <SearchBar />
    <Toolbar />
  </div>
);

const SearchBar: FC = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchText = searchParams.get('searchText') || '';

  const { searchInputRef, updateSearchText } = useSearchTasks();

  const onKeyPressCallback = (e: any) => { if (e.key === 'Enter') e.preventDefault(); };

  return (
    <TMInput
      id='tasks-search-bar'
      formValue={searchText}
      onChangeCallback={(updatedSearchText: string) => updateSearchText(updatedSearchText)}
      onKeyPressCallback={onKeyPressCallback}
      placeholder='search tasks...'
      ref={searchInputRef}
      type='search'
    />
  )
};

const Toolbar: FC = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);

  const onCancelCallback = useCallback(() => {  setIsCreateTaskModalOpen(false); }, []);

  return (
    <div id='task-header-toolbar'>
      <div id='tool-container' className={showToolbar ? 'toolbar-visible' : 'toolbar-hidden'}>
        <SortButton />
        <FilterMenuButton />
        <ClearSearchButton />
        <CreateTaskButton
          isModalOpen={isCreateTaskModalOpen}
          setIsModalOpen={setIsCreateTaskModalOpen}
        />
        <DownloadReportButton />
        <ToggleArchivedButton />
      </div>
      <ToggleToolbarButton showToolbar={showToolbar} setShowToolbar={setShowToolbar} />
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

export default TaskHeader;
