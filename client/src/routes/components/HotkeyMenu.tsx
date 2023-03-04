import './HotkeyMenu.scss';

import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import {
  HOTKEY_SECTIONS_BY_PATH,
  SHIFT_KEY_STROKES,
  UNIVERSAL_HOTKEY_SECTIONS,
} from 'settings';

interface HotkeyMenuProps {
  isShowing: boolean,
};

const HotkeyMenu: FC<HotkeyMenuProps> = ({ isShowing }) => {
  const { pathname: path } = useLocation();

  if (!isShowing) return null;

  const hotkeyMenuContent = (): JSX.Element[] => {
    // filter out sections that aren't relevant to the current page
    const hotkeySectionsByPath = (
      HOTKEY_SECTIONS_BY_PATH[path.substring(1)] ?? UNIVERSAL_HOTKEY_SECTIONS
    );
    const sections = Object.entries(SHIFT_KEY_STROKES).filter(
      ([hotkeySection, _]) => hotkeySectionsByPath.includes(hotkeySection)
    );

    return sections.map(([hotkeySection, hotkeys], index) =>
      <div className='hotkey-help-menu-section' key={hotkeySection}>
        <div className='hotkey-section-header'>
          {hotkeySection.charAt(0).toUpperCase() + hotkeySection.slice(1)}
        </div>
        <div className='section-hotkey'>
          {
            Object.entries(hotkeys).map(([action, hotkey]) => {
              const cleanedAction = action.replace(/([A-Z])/g, " $1");
              const formattedAction = cleanedAction.charAt(0).toUpperCase() + cleanedAction.slice(1);

              return (
                <div className='hotkey-reminder' key={action}>
                  <span className='hotkey-action'>{`${formattedAction}:`}&nbsp;&nbsp;</span>
                  <span className='keystroke'>Shift</span>
                  <span className='plus'>+</span>
                  <span className='keystroke'>{hotkey}</span>
                </div>
              );
            })
          }
        </div>
        {(index + 1 !== sections.length) && <hr />}
      </div>
    );
  };

  return (
    <div className='tm-modal' id='hotkey-help-menu'>
      <div className='tm-modal-header'>
        <b>Hotkey Help Menu</b>
        <hr />
      </div>
      <div className='tm-modal-content-footer'>
        {hotkeyMenuContent()}
      </div>
    </div>
  );
};

export default HotkeyMenu;
