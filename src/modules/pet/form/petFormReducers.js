import actions from 'modules/pet/form/petFormActions';

const initialData = {
  findLoading: false,
  saveLoading: false,
  types: null,
  users: null,
  breeds: null,
  pet: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.RESET) {
    return {
      ...initialData,
    };
  }
  if (type === actions.TYPES_SUCCESS) {
    return {
      ...state,
      types: payload.types,
    };
  }

  if (type === actions.BREEDS_SUCCESS) {
    return {
      ...state,
      breeds: payload.breeds,
    };
  }
  if (type === actions.BREEDS_RESET) {
    return {
      ...state,
      breeds: null,
    };
  }

  if (type === actions.USERS_SUCCESS) {
    return {
      ...state,
      users: payload.users,
    };
  }
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      pet: null,
      findLoading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      pet: payload,
      findLoading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      pet: null,
      findLoading: false,
    };
  }

  if (type === actions.ADD_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.ADD_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.ADD_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.UPDATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
