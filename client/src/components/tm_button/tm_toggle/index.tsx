import './index.scss';

export interface TMToggleButtonProps {
  classNames?: string[],
  onClick: () => void,
  selected?: boolean,
  selectedText?: string,
  unSelectedText?: String,
};

export const TMToggleButton = ({
  classNames = [],
  onClick,
  selected = false,
  selectedText = 'ON',
  unSelectedText = 'OFF',
}: TMToggleButtonProps) => {
  return (
    <div className={['tm-toggle', ...classNames].join(' ')} onClick={() => onClick()}>
      <div className={`tm-toggle-button ${selected ? 'selected' : 'unselected'}`}>
        {selected ? selectedText : unSelectedText}
      </div>
    </div>
  );
};
