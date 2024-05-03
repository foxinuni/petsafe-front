import actions from 'modules/auth/authActions';

const initialData = {
  currentUser: null,
  loadingInit: false,
  loadingEmailConfirmation: false,
  loadingPasswordReset: false,
  loadingUpdateProfile: false,
  loading: false,
  errorMessage: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.AUTH_START || type === actions.AUTH_REG_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true,
    };
  }
  if (type === actions.AUTH_REG_SUCCESS) {
    return {
      ...state,
      loading: false,
      ErrorMessage: null,
    };
  }

  if (type === actions.AUTH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      token: payload.token,
      errorMessage: null,
      loading: false,
    };
  }

  if (type === actions.AUTH_ERROR || type === actions.AUTH_REG_ERROR) {
    return {
      ...state,
      authenticationUser: null,
      currentUser: null,
      errorMessage: payload || null,
      loading: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_START) {
    return {
      ...state,
      loadingUpdateProfile: true,
    };
  }

  if (type === actions.UPDATE_PROFILE_SUCCESS) {
    return {
      ...state,
      currentUser: {
        email: state.currentUser.email,
        rol: state.currentUser.rol,
        ...payload.currentUser,
      },
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_ERROR) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.AUTH_INIT_SUCCESS) {
    return {
      ...state,
      authenticationUser: payload.authenticationUser || null,
      currentUser: payload.currentUser || null,
      loadingInit: false,
    };
  }

  if (type === actions.AUTH_INIT_ERROR) {
    return {
      ...state,
      authenticationUser: null,
      currentUser: null,
      loadingInit: false,
    };
  }

  return state;
};
