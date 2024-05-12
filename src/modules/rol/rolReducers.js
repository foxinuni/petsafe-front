import actions from 'modules/rol/rolActions';

const initialData = {
  roles: null,
  currentRole: null,
  findLoading: false,
  saveLoading: false,
  loading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.RESET) {
    return {
      currentRole: null,
      findLoading: false,
      saveLoading: false,
    };
  }
  if (type === actions.ROL_LIST_SUCCESS) {
    return {
      ...state,
      roles: payload.roles || null,
      loading: false,
    };
  }
  if (type === actions.ROL_START) {
    return {
      ...state,
      findLoading: true,
      loading: true,
    };
  }
  if (type === actions.DESTROY_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.DESTROY_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.DESTROY_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }
  if (type === actions.ROL_SUCCESS) {
    return {
      ...state,
      currentRole: payload.role || null,
      findLoading: false,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      user: payload,
      findLoading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      user: null,
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
  return state;
};
