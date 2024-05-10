import actions from 'modules/reservation/form/reservFormActions';

const initialData = {
  findLoading: false,
  saveLoading: false,
  owners: null,
  pets: null,
  reservation: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.RESET) {
    return {
      ...initialData,
    };
  }
  return state;
};
