import './FilterMenu.scss';

import { FC } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import TMCheckbox from 'components/tm_checkbox';
import TMDropdown from 'components/tm_dropdown';
import HotKeyTooltip from 'components/tm_hotkey_tooltip';
import TMMenu from 'components/tm_menu';
import { TMRangedDatePicker } from 'components/tm_date_picker';
import TMSearchableDropdown from 'components/tm_searchable_dropdown';
import TMTooltip, { TooltipDirection } from 'components/tm_tooltip';
import { useSearchTasks, useTasks } from 'providers';
import { Tag } from 'routes/tasks';
import { FilterAction, FilterType } from 'enums';
import { toClientDatetime } from 'utils';

const FilterMenuButton: FC = () => {
  const { isFilterMenuOpen, setIsFilterMenuOpen } = useSearchTasks();

  return (
    <TMMenu
      id='task-filter-menu'
      menuContent={<FilterMenuContent />}
      showMenu={isFilterMenuOpen}
      setShowMenu={setIsFilterMenuOpen}
    >
      <TMButton
        type={ButtonType.icon}
        classNames={['task-toolbar-icon']}
        onClick={() => {}}
        size={ButtonSize.small}
      >
        <TMTooltip
          content={<HotKeyTooltip action='Menu for filtering tasks' keyStroke={['shift', 'r']} />}
          direction={TooltipDirection.bottomLeft}
          id='filter-menu-tooltip'
        >
          <FaFilter />
        </TMTooltip>
      </TMButton>
    </TMMenu>
  );
}

const FilterMenuContent: FC = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchFilters = searchParams.get('filters') || '{}';
  const filters = JSON.parse(searchFilters);

  const { statusTypes, tags } = useTasks();
  const { clearUrlFilters, onFilterAction } = useSearchTasks();

  const startDate = filters[FilterType.startDate];
  const startDateFilter = startDate ? toClientDatetime(Number(startDate)) : undefined
  const endDate = filters[FilterType.endDate];
  const endDateFilter = endDate ? toClientDatetime(Number(endDate)) : undefined;
  const includeArchivedFilter = filters[FilterType.includeArchived];
  const includeArchived = includeArchivedFilter ? Boolean(includeArchivedFilter) : false;
  const statusName = filters[FilterType.status];
  const statusFilter = statusName ? statusTypes?.find(x => x.name === statusName) : undefined;
  const tagFilters = filters[FilterType.tags] || [];

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
              onAddTagCallback={
                (tagId: string) => onFilterAction(FilterAction.update, FilterType.tags, tagId)
              }
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
              onDeleteTagCallback={
                (tagId: string) => onFilterAction(FilterAction.remove, FilterType.tags, tagId)
              }
            />
          )
        }
      )
    }
  );

  const onDateFilter = (dates: Date[]) => {
    const [startDate, endDate] = dates;
    if (startDate) onFilterAction(FilterAction.update, FilterType.startDate, startDate);
    if (endDate) onFilterAction(FilterAction.update, FilterType.endDate, endDate);
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
          (statusType: DropdownOption) => onFilterAction(
            FilterAction.update,
            FilterType.status,
            statusTypes.find(x => x.id === statusType.id).name,
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
        onOptionSelectCallback={
          (tagId: string) => onFilterAction(FilterAction.update, FilterType.tags, tagId)
        }
      />
      <TMCheckbox
        classNames={['filter-menu-dropdown', 'include-archived-tasks-checkbox']}
        isActive={includeArchived}
        textBlock='include archived tasks'
        toggleIsActive={
          () => {
            const updatedValue = !includeArchived;
            updatedValue
              ? onFilterAction(FilterAction.update, FilterType.includeArchived, updatedValue)
              : onFilterAction(FilterAction.remove, FilterType.includeArchived);
          }
        }
      />
      <ClearFiltersButton clearFilters={clearUrlFilters} />
    </div>
  );
};

interface ClearFiltersButtonProps {
  clearFilters: () => void,
};

const ClearFiltersButton: FC<ClearFiltersButtonProps> = ({ clearFilters }) => (
  <TMButton
    type={ButtonType.solid}
    classNames={['clear-filter-button', 'grey']}
    size={ButtonSize.extraSmall}
    onClick={clearFilters}
  >
    Clear Filters
  </TMButton>
);

export default FilterMenuButton;
