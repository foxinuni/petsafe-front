const prefix = 'RESERV_FORM';

const actions = {
  RESET: `${prefix}_RESET`,
  RESET_OWNER: `${prefix}_RESET_OWNER`,
  doNew: () => {
    return {
      type: actions.RESET,
    };
  },
};

export default actions;
