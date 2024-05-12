import actions from 'modules/reservation/form/reservFormActions';

const initialData = {
  findLoading: false,
  saveLoading: false,
  owners: null,
  pets: null,
  reservation: null,
  states: null,
  owner: null,
};

export default (state = initialData, { type, payload }) => {
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

  if (type === actions.PETS_FETCH_SUCCESS) {
    return {
      ...state,
      pets: payload.pets,
    };
  }

  if (type === actions.PETS_FETCH_ERROR) {
    return {
      ...state,
      pets: null,
    };
  }

  if (type === actions.PETS_RESET) {
    return {
      ...state,
      pets: null,
    };
  }
  return state;
};
