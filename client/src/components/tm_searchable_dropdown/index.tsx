import './index.scss';

import { FC, ReactElement, useEffect, useRef, useState } from 'react';

import TMInput from 'components/tm_input';
import useOnClickOutside from 'hooks/useOnOutsideClick';

interface ITMSearchableDropdown {
  classNames?: string[],
  clearKey?: string,
  id?: string,
  placeholder?: string,
  searchableOptions?: SearchableOption[],
  selectedOptions?: SearchableOption[],
  onOptionSelectCallback: (id: string) => void,
};

const TMSearchableDropdown: FC<ITMSearchableDropdown> = ({
  classNames = [],
  clearKey = 'Escape',
  id = '',
  placeholder = 'Search...',
  searchableOptions,
  selectedOptions,
  onOptionSelectCallback,
}) => {
  const [filteredSearchOptions, setFilteredSearchOptions] = useState(searchableOptions);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState('');
  const updateSearchText = (updatedSearchText: string) => {
    if (!isInputFocused) setIsInputFocused(true);
    setSearchText(updatedSearchText);
  };

  useEffect(() => {
    setFilteredSearchOptions(
      searchableOptions?.filter(
        searchableOption =>
          searchableOption.searchableValue.toLowerCase().includes(searchText.toLowerCase())
      ) || []
    );
  }, [searchText, searchableOptions]);

  const inputRef = useRef(null);
  const searchableOptionsRef = useRef(null);
  useOnClickOutside(searchableOptionsRef, () => setIsInputFocused(false));

  const onOptionSelect = (selectedId: string) => {
    onOptionSelectCallback(selectedId);
    setIsInputFocused(false);
  };

  const buildFilteredSearchOptions = (): ReactElement => {
    const classes = [
      'filtered-search-options',
      'sub-header-text',
      isInputFocused ? 'visible' : 'hidden',
    ];
    let isFirstMatch = true;

    return (
      <ul className={classes.join(' ')} ref={searchableOptionsRef}>
        {
          !!filteredSearchOptions.length
            ? (
              filteredSearchOptions?.map(
                searchableOption => {
                  const itemClasses = [];
                  if (isFirstMatch) {
                    isFirstMatch = false;
                    if (
                      filteredSearchOptions.length === 1 ||
                      searchableOption.searchableValue.length - searchText.length < 5 ||
                      searchableOption.searchableValue.toLowerCase() === searchText.toLowerCase()
                    ) {
                      itemClasses.push('best-match')
                    }
                  }

                  return (
                    <li
                      className={itemClasses.join(' ')}
                      key={searchableOption.id}
                      onClick={() => onOptionSelect(searchableOption.id)}
                    >
                      {searchableOption.searchableValue}
                    </li>
                  )
                }
              )
            )
            : (
              <li key='no-filtered-search-options'>
                {searchText ? `No options matching "${searchText}"` : 'No options available'}
              </li>
            )
        }
      </ul>
    )
  };

  const onChangeCallback = (updatedSearchText: string) => { updateSearchText(updatedSearchText); };

  const onFocusCallback = (_: any) => { setIsInputFocused(true); };

  const onKeyPressCallback = (event: any) => {
    if (event.key === 'Enter' && searchText !== '' && !!filteredSearchOptions.length) {
      event.preventDefault();
      onOptionSelect(filteredSearchOptions[0].id);
      updateSearchText('');
      setIsInputFocused(false);
    } else if (event.key === clearKey) updateSearchText('');
  };

  return (
    <div className={['tm-searchable-dropdown', ...classNames].join(' ')} id={id}>
      <TMInput
        classNames={[isInputFocused ? 'focused' : '']}
        clearKey={clearKey}
        formValue={searchText}
        onChangeCallback={onChangeCallback}
        onFocusCallback={onFocusCallback}
        onKeyPressCallback={onKeyPressCallback}
        placeholder={placeholder}
        ref={inputRef}
      />
      {buildFilteredSearchOptions()}
      {
        !!selectedOptions?.length &&
        <div className='searchable-input-selected-options'>
          {selectedOptions?.map(selectedOption => selectedOption.content)}
        </div>
      }
    </div>
  );
};

export default TMSearchableDropdown;
