import actions from 'modules/reservation/form/reservFormActions';

const initialData = {
  saveLoading: false,
  owners: null,
  reservation: null,
  states: null,
  owner: null,
  pet: null,
  fee: 0,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.CREATE_ERROR) {
    return {
      ...initialData,
    };
  }
  if (type === actions.FEE_CHANGED) {
    return {
      ...state,
      fee: payload,
    };
  }
  if (type === actions.RESET_FEE) {
    return {
      ...state,
      fee: 0,
    };
  }
  if (type === actions.RESET) {
    return {
      ...initialData,
    };
  }
  if (type === actions.PET_FIND_ERROR) {
    return {
      ...state,
      pet: null,
      owner: null,
    };
  }
  if (type === actions.PET_FIND_SUCCESS) {
    return {
      ...state,
      pet: payload.pet,
      owner: payload.owner,
    };
  }
  if (type === actions.RESET) {
    return {
      ...initialData,
    };
  }

  if (type === actions.STATES_FETCH_SUCCESS) {
    return {
      ...state,
      states: payload.states,
    };
  }

  if (type === actions.STATES_FETCH_ERROR) {
    return {
      ...state,
      states: null,
    };
  }

  if (type === actions.OWNERS_FETCH_SUCCESS) {
    return {
      ...state,
      owners: payload.owners,
    };
  }

  if (type === actions.OWNERS_FETCH_ERROR) {
    return {
      ...state,
      owners: null,
    };
  }

  if (type === actions.OWNER_RESET) {
    return {
      ...state,
      owner: null,
    };
  }
  return state;
};
