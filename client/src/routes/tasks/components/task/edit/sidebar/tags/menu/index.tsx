import './index.scss';

import { FC, MutableRefObject, useRef, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { IoColorPaletteOutline } from 'react-icons/io5';

import { TMButton } from 'components/tm_button';
import TMTextArea from 'components/tm_text_area';
import useOnClickOutside from 'hooks/useOnOutsideClick';
import { useTask } from 'providers/task';
import { useTasks } from 'providers/tasks';
import TaskTag from 'routes/tasks/components/task/edit/sidebar/tags/tag';

const populateTaskTags = (tags: Tag[], isInUse: boolean, isEditable: boolean = false) => {
  return tags.map(tag => {
    return (
      <TaskTag
        key={`tag-menu-tag-${tag.id}`}
        hexColor={tag.hexColor}
        id={tag.id}
        isEditable={isEditable}
        isInUse={isInUse}
        name={tag.name}
        tagId={tag.tagId}
      />
    )
  });
};

interface ITagMenu {
  onCloseCallback: () => void,
  reference: MutableRefObject<any>,
};

const TagMenu: FC<ITagMenu> = ({ onCloseCallback, reference }) => {
  const [isAddMenu, setIsAddMenu] = useState(true);
  useOnClickOutside(reference, onCloseCallback);

  return (
    <div id='tag-menu'>
      <Header isAddMenu={isAddMenu} setIsAddMenu={setIsAddMenu} />
      <div id='tag-menu-body'>
        {isAddMenu ? <AddMenu /> : <ManageMenu />}
      </div>
    </div>
  );
};

interface IHeader {
  isAddMenu: boolean,
  setIsAddMenu: (isAddMenu: boolean) => void,
};

const Header: FC<IHeader> = ({ isAddMenu, setIsAddMenu }) => (
  <div className='tag-menu-header'>
    <TMButton
      buttonStyle='underline'
      classNames={[isAddMenu ? 'active' : '']}
      size='medium'
      onClick={() => setIsAddMenu(true)}
    >
      Add
    </TMButton>
    <TMButton
      buttonStyle='underline'
      classNames={[isAddMenu ? '' : 'active']}
      size='medium'
      onClick={() => setIsAddMenu(false)}
    >
      Manage
    </TMButton>
  </div>
);

const AddMenu: FC = () => {
  const { tags: userTags } = useTasks();
  const { tags: taskTags } = useTask();

  const taskTagNames = taskTags.map(taskTag => taskTag.name);
  const unusedTags = userTags.filter(userTag => !taskTagNames.includes(userTag.name));

  return (
    <div id='add-menu'>
      <div id='active-task-tags'>
        {populateTaskTags(taskTags, true)}
      </div>
      {!!taskTagNames.length && <hr />}
      <div id='inactive-user-tags'>
        {populateTaskTags(unusedTags, false)}
      </div>
    </div>
  );
};

const ManageMenu: FC = () => {
  const { tags: userTags } = useTasks();

  return (
    <div id='manage-menu'>
      {populateTaskTags(userTags, true, true)}
      <AddTagButton />
    </div>
  );
};

const AddTagButton: FC = () => {
  const inputRef = useRef(null);
  const [isInAddMode, setIsInAddMode] = useState(false);
  const [isColorPickerShowing, setIsColorPickerShowing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [hexColor, setHexColor] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');

  const { createTag } = useTasks();

  const onKeyPressCallback = (e: any) => {
    if (errorMessage) setErrorMessage(undefined);
    if (e.key === 'Enter' && !!(hexColor && name.length)) {
      if (!!(hexColor && name)) {
        createTag({ hexColor, name });
        setHexColor(undefined);
        setName('');
      }
      else if (!hexColor) setErrorMessage('Please select a color')
      else if (name === '') setErrorMessage('Please enter a valid tag name')
    }
  };

  return (
    isInAddMode
      ? (
        <div id='create-tag-input-container' style={{ backgroundColor: hexColor || '#FFFFFF' }}>
          <TMTextArea
            autoFocus
            id='create-tag-input'
            managedValue={name}
            placeholder='tag name...'
            reference={inputRef}
            rowCount={1}
            onKeyPressCallback={onKeyPressCallback}
            updatedManagedValue={(updatedName: string) => setName(updatedName)}
          />
          <div id='color-palette-icon-container'>
            <IoColorPaletteOutline
              onClick={() => setIsColorPickerShowing(!isColorPickerShowing)}
            />
            {
              isColorPickerShowing &&
              <ColorPicker
                hexColor={hexColor}
                setIsColorPickerShowing={setIsColorPickerShowing}
                setHexColor={setHexColor}
              />
            }
          </div>
        </div>
      )
      : (
        <TMButton
          buttonStyle='icon'
          classNames={['add-button']}
          size='medium'
          onClick={() => setIsInAddMode(true)}
        >
          <div className='add-button-content sub-header-text'>
            <IoMdAdd />
            Add Tag
          </div>
        </TMButton>
      )
  );
};

interface IColorPicker {
  hexColor?: string,
  setIsColorPickerShowing: (isColorPickerShowing: boolean) => void,
  setHexColor: (hexColor?: string) => void,
};

const ColorPicker: FC<IColorPicker> = ({ hexColor, setIsColorPickerShowing, setHexColor}) => {
  const hexColorOptions = [
    '#FF9AA2', '#FFB7B2', '#FFDAC1', '#F3F3AB', '#E2F0CB', '#B5EAD7', '#D7E5EC', '#C7CEEA', '#C2A2C2',
  ];

  const handleColorSelect = (selectedColor: string) => {
    setHexColor(selectedColor);
    setIsColorPickerShowing(false);
  };

  const populateColorPalette = () => {
    return hexColorOptions.map(color => {
      return (
        <div
          key={`color-palette-${color}`}
          className={['color-swatch', color === hexColor ? 'active' : ''].join(' ')}
          style={{ background: color }}
          onClick={() => handleColorSelect(color)}
        />
      );
    });
  };

  return (
  <div id='color-picker-menu'>
    {populateColorPalette()}
  </div>
  );
};

export default TagMenu;
