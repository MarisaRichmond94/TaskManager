import './TagMenu.scss';

import { FC, MutableRefObject, useRef, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { IoColorPaletteOutline } from 'react-icons/io5';

import TMButton, { ButtonSize, ButtonType } from 'components/tm_button';
import TMTextArea from 'components/tm_text_area';
import { useOnClickOutside } from 'hooks';
import { useTask, useTasks } from 'providers';
import { TaskTag } from 'routes/tasks';
import { TAG_COLORS } from 'settings';

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

interface TagMenuProps {
  onCloseCallback: () => void,
  reference: MutableRefObject<any>,
  style: object,
};

const TagMenu: FC<TagMenuProps> = ({ onCloseCallback, reference, style }) => {
  const [isAddMenu, setIsAddMenu] = useState(true);
  useOnClickOutside(reference, onCloseCallback);

  return (
    <div className='menu sidebar-menu' style={style}>
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
      type={ButtonType.underline}
      classNames={[isAddMenu ? 'active' : '']}
      size={ButtonSize.medium}
      onClick={() => setIsAddMenu(true)}
    >
      Add
    </TMButton>
    <TMButton
      type={ButtonType.underline}
      classNames={[isAddMenu ? '' : 'active']}
      size={ButtonSize.medium}
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
            updateManagedValue={(updatedName: string) => setName(updatedName)}
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
          type={ButtonType.icon}
          classNames={['add-button']}
          size={ButtonSize.medium}
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

interface ColorPickerProps {
  hexColor?: string,
  setIsColorPickerShowing: (isColorPickerShowing: boolean) => void,
  setHexColor: (hexColor?: string) => void,
};

const ColorPicker: FC<ColorPickerProps> = ({ hexColor, setIsColorPickerShowing, setHexColor}) => {
  const handleColorSelect = (selectedColor: string) => {
    setHexColor(selectedColor);
    setIsColorPickerShowing(false);
  };

  const populateColorPalette = () => {
    return TAG_COLORS.map(color => {
      return (
        <div
          key={`color-palette-${color}`}
          className={['color-swatch', color === hexColor ? 'active' : ''].join(' ')}
          style={{ backgroundColor: color }}
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
