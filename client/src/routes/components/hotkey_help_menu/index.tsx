import './index.scss';

import { FC } from 'react';

import { SHIFT_KEY_STROKES } from 'settings/hotkeys';

interface IHotkeyHelpMenu {
  isShowing: boolean,
};

const HotkeyHelpMenu: FC<IHotkeyHelpMenu> = ({ isShowing }) => {
  if (!isShowing) return null;

  const hotkeyHelpMenuContent = (): JSX.Element[] => {
    const sections = Object.entries(SHIFT_KEY_STROKES);
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
        {hotkeyHelpMenuContent()}
      </div>
    </div>
  );
};

export default HotkeyHelpMenu;
