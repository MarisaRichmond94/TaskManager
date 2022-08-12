import './index.scss';

import { FC } from 'react';
import { BsX } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import TMButton, { ButtonSize, ButtonStyle } from 'components/tm_button';

interface ITag {
  classNames?: string[],
  hexColor: string,
  id: string,
  isInUse?: boolean,
  name: string,
  onAddTagCallback?: (tagId: string) => void,
  onDeleteTagCallback?: (tagId: string) => void,
};

const Tag: FC<ITag> = ({
  classNames = [],
  hexColor,
  id,
  isInUse = false,
  name,
  onAddTagCallback,
  onDeleteTagCallback,
}) => (
  <div className={['tag', ...classNames].join(' ')} style={{ backgroundColor: hexColor }}>
    <div className='sub-header-text'>
      {name}
    </div>
    <TMButton
      buttonStyle={ButtonStyle.icon}
      size={ButtonSize.medium}
      onClick={() => isInUse ? onDeleteTagCallback(id) : onAddTagCallback(id)}
    >
      {isInUse ? <BsX /> : <IoMdAdd />}
    </TMButton>
  </div>
);

export default Tag;
