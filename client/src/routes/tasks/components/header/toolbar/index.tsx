import './index.scss';

import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaFilter } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { TMButton } from 'components/tm_button';
import TMCheckbox from 'components/tm_button/tm_checkbox';
import TMDropdown from 'components/tm_dropdown';
import TMMenu from 'components/tm_menu';
import TMRangedDatePicker from 'components/tm_date_picker/ranged';
import TMSearchableDropdown from 'components/tm_searchable_dropdown';
import useKeyStroke from 'hooks/useKeyStroke';
import { useSearchTasks } from 'providers/search_tasks';
import { useTasks } from 'providers/tasks';
import Tag from 'routes/tasks/components/tag';
import { HOT_KEYS } from 'settings';

const { NEW_TASK_KEY, TOGGLE_SORT_KEY } = HOT_KEYS;

const Toolbar: FC = () => {
  const navigate = useNavigate();
  const { createTask } = useTasks();
  const [isAsc, setIsAsc] = useState(false);

  const handleKeyStrokes = (event: KeyboardEvent<any>) => {
    switch (event.key) {
      case NEW_TASK_KEY: createTask(); break;
      case TOGGLE_SORT_KEY: updateSortOrder(!isAsc);
    }
  };

  useKeyStroke(
    [
      { shiftKey: true, key: NEW_TASK_KEY },
      { shiftKey: true, key: TOGGLE_SORT_KEY },
    ],
    handleKeyStrokes,
  );

  const updateSortOrder = (updatedSortOrder: boolean) => {
    setIsAsc(updatedSortOrder);
    const searchParams = new URLSearchParams();
    searchParams.set('asc', updatedSortOrder.toString());
    navigate({ search: searchParams.toString() });
  };

  return (
    <div id='task-header-toolbar'>
      <SortButton isAsc={isAsc} updateSortOrder={updateSortOrder} />
      <FilterMenuButton />
      <CreateTaskButton />
      <MiscMenuButton />
    </div>
  );
};

interface ISortButton {
  isAsc: boolean,
  updateSortOrder: (sortOrder: boolean) => void,
};

const SortButton: FC<ISortButton> = ({ isAsc, updateSortOrder }) => (
  <TMButton
    buttonStyle='icon'
    classNames={['task-toolbar-icon']}
    onClick={() => updateSortOrder(!isAsc)}
    size='medium'
  >
    {isAsc ? <RiSortAsc /> : <RiSortDesc />}
  </TMButton>
);

const FilterMenuButton: FC = () => (
  <TMMenu
    id='task-filter-menu'
    menuContent={<FilterMenuContent />}
  >
    <TMButton
      buttonStyle='icon'
      classNames={['task-toolbar-icon']}
      onClick={() => {}}
      size='small'
    >
      <FaFilter />
    </TMButton>
  </TMMenu>
);

const FilterMenuContent: FC = () => {
  const { statusTypes, tags } = useTasks();
  const {
    clearFilters,
    endDateFilter, setEndDateFilter,
    includeArchived, setIncludeArchived,
    startDateFilter, setStartDateFilter,
    statusFilter, setStatusFilter,
    tagFilters, addTagFilter, removeTagFilter,
  } = useSearchTasks();

  useEffect(() => { clearFilters(); }, []);

  const searchableTags = tags
    ?.filter(tag => !tagFilters.includes(tag.id))
    ?.map(tag => {
      const { hexColor, id, name } = tag;
      return (
        {
          id: id,
          searchableValue: name,
          content: (
            <Tag
              hexColor={hexColor}
              id={id}
              key={id}
              name={name}
              onAddTagCallback={addTagFilter}
            />
          )
        }
      )
    });
  const selectedTags = tags
    ?.filter(tag => tagFilters.includes(tag.id))
    ?.map(tag => {
      const { hexColor, id, name } = tag;
      return (
        {
          id: id,
          searchableValue: name,
          content: (
            <Tag
              classNames={['selected-filter-tag']}
              hexColor={hexColor}
              id={id}
              key={id}
              isInUse
              name={name}
              onDeleteTagCallback={removeTagFilter}
            />
          )
        }
      )
    }
  );

  const onDateFilter = (dates: Date[]) => {
    const [startDate, endDate] = dates;
    setStartDateFilter(startDate);
    setEndDateFilter(endDate);
  };

  return (
    <div className='menu-content'>
      <div className='center thick sub-header-text'>Filter Tasks</div>
      <hr />
      <TMRangedDatePicker
        endDate={endDateFilter}
        onChange={onDateFilter}
        placeholder='Due date...'
        startDate={startDateFilter}
      />
      <TMDropdown
        key='filter-menu-status-dropdown'
        classNames={['filter-menu-dropdown']}
        onOptionSelect={
          (statusType: DropdownOption) => setStatusFilter(
            statusTypes.find(x => x.id === statusType.id)
          )
        }
        options={statusTypes.map(s => { return { id: s.id, displayName: s.name } })}
        placeholder='Status...'
        selectedOption={statusFilter && { id: statusFilter.id, displayName: statusFilter.name }}
      />
      <TMSearchableDropdown
        placeholder='Search tags...'
        searchableOptions={searchableTags}
        selectedOptions={selectedTags}
        onOptionSelectCallback={addTagFilter}
      />
      <TMCheckbox
        classNames={['filter-menu-dropdown', 'include-archived-tasks-checkbox']}
        isActive={includeArchived}
        textBlock='include archived tasks'
        toggleIsActive={() => setIncludeArchived(!includeArchived)}
      />
      <ClearFiltersButton clearFilters={clearFilters} />
    </div>
  );
};

interface IClearFiltersButton {
  clearFilters: () => void,
};

const ClearFiltersButton: FC<IClearFiltersButton> = ({ clearFilters }) => (
  <TMButton
    buttonStyle='solid'
    classNames={['clear-filter-button', 'grey']}
    size='extra-small'
    onClick={clearFilters}
  >
    Clear Filters
  </TMButton>
);

const CreateTaskButton: FC = () => {
  const { createTask } = useTasks();

  return (
    <TMButton
      buttonStyle='icon'
      classNames={['task-toolbar-icon']}
      onClick={createTask}
      size='large'
    >
      <IoMdAdd />
    </TMButton>
  );
};

const MiscMenuButton: FC = () => {
  const { isShowingArchivedTasks, setIsShowingArchivedTasks } = useTasks();

  return (
    <TMMenu
      id='toolbar-menu'
      menuContent={
        <div className='menu-item'>
          <TMCheckbox
            classNames={['task-menu-item']}
            isActive={isShowingArchivedTasks}
            textBlock='show archived'
            toggleIsActive={() => setIsShowingArchivedTasks(!isShowingArchivedTasks)}
          />
        </div>
      }
    >
      <TMButton
        buttonStyle='icon'
        classNames={['task-toolbar-icon']}
        onClick={() => {}}
        size='large'
      >
        <AiOutlineMenu />
      </TMButton>
    </TMMenu>
  );
};

export default Toolbar;
