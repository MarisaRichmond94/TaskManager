import './index.scss';

import { cloneElement, FC, ReactElement, useRef, useState } from 'react';

import { useOnClickOutside } from 'hooks';

interface TMMenuProps {
  children: ReactElement,
  id: string,
  menuContent: ReactElement[] | ReactElement,

  classNames?: string[],
  showMenu?: boolean,

  onCloseCallback?: () => void,
  setShowMenu?: (showMenu: boolean) => void,
};

interface TMUncontrolledMenuProps {
  children: ReactElement,
  id: string,
  menuContent: ReactElement[] | ReactElement,

  classNames?: string[],

  onCloseCallback?: () => void,
};

const TMMenu: FC<TMMenuProps> = ({ setShowMenu, ...props }) => {
  const isControlledMenu = !!setShowMenu;

  return (
    isControlledMenu
      ? <TMControlledMenu setShowMenu={setShowMenu} {...props} />
      : <TMUncontrolledMenu {...props} />
  );
};

const TMUncontrolledMenu: FC<TMUncontrolledMenuProps> = ({
  children,
  id,
  menuContent,

  classNames = [],

  onCloseCallback,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const onClickOutside = () => {
    setShowMenu(false);
    if (showMenu && !!onCloseCallback) onCloseCallback();
  };

  const menuRef = useRef(null);
  useOnClickOutside(menuRef, onClickOutside);

  return (
    <div className={['tm-menu-container', ...classNames].join(' ')} ref={menuRef} id={id}>
      {cloneElement(children, { onClick: () => setShowMenu(!showMenu) })}
      {
        showMenu &&
        <div className='tm-menu'>
          {menuContent}
        </div>
      }
    </div>
  );
};

const TMControlledMenu: FC<TMMenuProps> = ({
  children,
  id,
  menuContent,

  classNames =  [],
  showMenu,

  onCloseCallback,
  setShowMenu,
}) => {
  const onClickOutside = () => {
    setShowMenu(false);
    if (showMenu && !!onCloseCallback) onCloseCallback();
  };

  const menuRef = useRef(null);
  useOnClickOutside(menuRef, onClickOutside);

  return (
    <div className={['tm-menu-container', ...classNames].join(' ')} ref={menuRef} id={id}>
      {cloneElement(children, { onClick: () => setShowMenu(!showMenu) })}
      {
        showMenu &&
        <div className='tm-menu'>
          {menuContent}
        </div>
      }
    </div>
  );
};

export default TMMenu;
