import { NavigateFunction, Search } from 'react-router';

import { STATUS_NAMES } from 'settings';
import { FilterType } from 'enums';
import { compareDates, toServerDatetime } from 'utils';


const clear = (search: Search, navigate: NavigateFunction) => {
  const searchParams = new URLSearchParams(search);
  searchParams.delete('filters');
  navigate({ search: searchParams.toString() });
};

const setSearchText = (updatedSearchText: string, search: string, navigate: NavigateFunction) => {
  const searchParams = new URLSearchParams(search);
    updatedSearchText === ''
      ? searchParams.delete('searchText')
      : searchParams.set('searchText', updatedSearchText);
  navigate({ search: searchParams.toString() });
};

const update = (
  filterType: FilterType,
  filterValue: any,
  search: string,
  navigate: NavigateFunction,
  hasMultiple: boolean = false,
) => {
  if (filterValue instanceof Date) filterValue = toServerDatetime(filterValue);
  const searchParams = new URLSearchParams(search);
  const searchFilters = searchParams.get('filters') || '{}';

  const filters = JSON.parse(searchFilters);
  if (hasMultiple) {
    const multiValuedList = filters[filterType as string] || [];
    multiValuedList.push(filterValue);
    filters[filterType as string] = multiValuedList;
  } else {
    filters[filterType as string] = filterValue;
  }
  searchParams.set('filters', JSON.stringify(filters));
  navigate({ search: searchParams.toString() });
};

const remove = (
  filterType: FilterType,
  search: string,
  navigate: NavigateFunction,
  filterValue?: any,
) => {
  const searchParams = new URLSearchParams(search);
  const searchFilters = searchParams.get('filters') || '{}';

  const filters = JSON.parse(searchFilters);
  if (filterValue) {
    const multiValuedList = filters[filterType as string]?.filter(x => x !== filterValue);
    if (!multiValuedList.length) delete filters[filterType as string];
    filters[filterType as string] = multiValuedList;
  } else {
    delete filters[filterType as string];
  }
  !!Object.keys(filters).length
    ? searchParams.set('filters', JSON.stringify(filters))
    : searchParams.delete('filters');
  navigate({ search: searchParams.toString() });
};

const filter = (tasks: Task[], search: string): Task[] => {
  let filteredTasks = [...tasks];
  const searchParams = new URLSearchParams(search);
  const searchFilters = searchParams.get('filters') || '{}';
  const filters = JSON.parse(searchFilters);

  filteredTasks = _filterBySearchText(filteredTasks, searchParams.get('searchText') || '');

  const includeArchived = (
    filters[FilterType.includeArchived] ||
    searchParams.get(FilterType.includeArchived)
  );
  filteredTasks = _filterByIncludeArchived(
    filteredTasks,
    includeArchived ? Boolean(includeArchived) : false,
  );

  filteredTasks = _filterByStatus(filteredTasks, filters[FilterType.status]);

  filteredTasks = _filterByTags(filteredTasks, filters[FilterType.tags] || []);

  const startDateFilter = filters[FilterType.startDate];
  filteredTasks = _filterByStartDate(
    filteredTasks,
    startDateFilter ? Number(startDateFilter) : undefined,
  );

  const endDateFilter = filters[FilterType.endDate];
  filteredTasks = _filterByEndDate(
    filteredTasks,
    endDateFilter ? Number(endDateFilter) : undefined,
  );

  return filteredTasks;
};

const _filterBySearchText = (tasksToFilter: Task[], searchText: string): Task[] => {
  if (searchText === '') return tasksToFilter;
  const matchText = searchText.toLowerCase();
  return tasksToFilter.filter(x => x.objective && x.objective.toLowerCase().includes(matchText));
};

const _filterByStartDate = (tasksToFilter: Task[], startDateFilter?: number): Task[] => {
  return !!startDateFilter
    ? tasksToFilter.filter(x => compareDates(x.dueDate, startDateFilter, false))
    : tasksToFilter;
};

const _filterByEndDate = (tasksToFilter: Task[], endDateFilter?: number): Task[] => {
  return !!endDateFilter
    ? tasksToFilter.filter(x => compareDates(x.dueDate, endDateFilter))
    : tasksToFilter;
};

const _filterByIncludeArchived = (tasksToFilter: Task[], includeArchived: boolean): Task[] => {
  return includeArchived
    ? tasksToFilter
    : tasksToFilter.filter(task => task.status.name !== STATUS_NAMES.archived);
};

const _filterByStatus = (tasksToFilter: Task[], statusNameFilter?: string): Task[] => {
  return !!statusNameFilter
    ? tasksToFilter.filter(task => task.status.name === statusNameFilter)
    : tasksToFilter;
};

const _filterByTags = (tasksToFilter: Task[], tagFilters: string[]): Task[] => {
  if (!tagFilters.length) return tasksToFilter;
  return tasksToFilter.filter(task => {
    const taskTagIds = task.tags.map(tag => tag.tagId);
    return tagFilters.every(tagFilter => taskTagIds.includes(tagFilter));
  });
};

export {
  clear,
  remove,
  filter,
  update,
  setSearchText,
};
