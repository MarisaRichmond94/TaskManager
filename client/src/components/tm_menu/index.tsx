import './index.scss';

import { cloneElement, FC, ReactElement, useRef, useState } from 'react';

import useOnClickOutside from 'hooks/useOnOutsideClick';

interface ITMMenu {
  children: ReactElement,
  classNames?: string[],
  id: string,
  menuContent: ReactElement[] | ReactElement,
};

const TMMenu: FC<ITMMenu> = ({ children, classNames =  [], id, menuContent }) => {
  const [showMenu, setShowMenu] = useState(false);

  const onClickOutside = () => {
    setShowMenu(false);
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
