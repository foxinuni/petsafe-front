const prefix = 'LAYOUT';

const actions = {
  MENU_TOGGLE: `${prefix}_MENU_TOGGLE`,
  MENU_HIDE: `${prefix}_MENU_HIDE`,
  MENU_SHOW: `${prefix}_MENU_SHOW`,

  doToggleMenu: () => {
    return {
      type: actions.MENU_TOGGLE,
    };
  },

  doShowMenu: () => {
    return {
      type: actions.MENU_SHOW,
    };
  },

  doHideMenu: () => {
    return {
      type: actions.MENU_HIDE,
    };
  },
};

export default actions;
