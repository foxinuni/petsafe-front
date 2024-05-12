import service from 'modules/auth/authService';
import rolService from 'modules/rol/rolService';
import Errors from 'modules/error/errors';
import Message from 'view/shared/message';
import { getHistory } from 'modules/store';
import { dateToString } from 'modules/shared/dates';

const prefix = 'AUTH';

const actions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  AUTH_INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  AUTH_INIT_ERROR: `${prefix}_INIT_ERROR`,

  AUTH_START: `${prefix}_START`,
  AUTH_SUCCESS: `${prefix}_SUCCESS`,
  AUTH_ERROR: `${prefix}_ERROR`,

  AUTH_REG_START: `${prefix}_REG_START`,
  AUTH_REG_SUCCESS: `${prefix}_REG_SUCCESS`,
  AUTH_REG_ERROR: `${prefix}_REG_ERROR`,

  UPDATE_PROFILE_START: `${prefix}_UPDATE_PROFILE_START`,
  UPDATE_PROFILE_SUCCESS: `${prefix}_UPDATE_PROFILE_SUCCESS`,
  UPDATE_PROFILE_ERROR: `${prefix}_UPDATE_PROFILE_ERROR`,

  CURRENT_USER_REFRESH_START: `${prefix}_CURRENT_USER_REFRESH_START`,
  CURRENT_USER_REFRESH_SUCCESS: `${prefix}_CURRENT_USER_REFRESH_SUCCESS`,
  CURRENT_USER_REFRESH_ERROR: `${prefix}_CURRENT_USER_REFRESH_ERROR`,

  doClearErrorMessage() {
    return {
      type: actions.ERROR_MESSAGE_CLEARED,
    };
  },

  doRegisterEmailAndPassword:
    (email, password, name, surname, number) => async (dispatch) => {
      try {
        dispatch({ type: actions.AUTH_REG_START });
        const user = await service.registerWithEmailAndPassword(
          email,
          password,
        );
        if (user) {
          await service.createProfile(number, name, surname, user.token);
          dispatch({
            type: actions.AUTH_REG_SUCCESS,
          });
          Message.success('Perfil creado exitosamente, ingrese');
          getHistory().push('/');
        } else {
          Errors.handle(null, dispatch);
          dispatch({
            type: actions.AUTH_REG_ERROR,
          });
        }
      } catch (error) {
        await service.signout();
        Errors.handle(error, dispatch);
        dispatch({
          type: actions.AUTH_REG_ERROR,
        });
      }
    },

  doSigninWithEmailAndPassword: (email, password) => async (dispatch) => {
    try {
      dispatch({ type: actions.AUTH_START });
      const credentials = await service.signin(email, password);
      if (credentials && credentials.user) {
        credentials.user.rol = await rolService.getMe(credentials.token);
        const currentUser = await service.getProfile(credentials);
        currentUser.email = credentials.user.email;
        currentUser.rol = credentials.user.rol;
        currentUser.createdAt = dateToString(currentUser.created_at);
        currentUser.updatedAt = dateToString(currentUser.updated_at);
        delete currentUser.created_at;
        delete currentUser.updated_at;
        dispatch({
          type: actions.AUTH_SUCCESS,
          payload: {
            currentUser: currentUser,
            token: credentials.token,
          },
        });
      } else {
        Errors.handle(null, dispatch);
        dispatch({
          type: actions.AUTH_ERROR,
        });
      }
    } catch (error) {
      Errors.handle(error, dispatch);
      dispatch({
        type: actions.AUTH_ERROR,
      });
    }
  },

  doSignout: () => async (dispatch) => {
    try {
      dispatch({ type: actions.AUTH_START });
      await service.signout();

      dispatch({
        type: actions.AUTH_SUCCESS,
        payload: {
          authenticationUser: null,
          currentUser: null,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.AUTH_ERROR,
      });
    }
  },

  doUpdateProfile: (name, surname, number, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.UPDATE_PROFILE_START,
      });

      const newProfile = await service.updateProfile(
        name,
        surname,
        number,
        token,
      );
      dispatch({
        type: actions.UPDATE_PROFILE_SUCCESS,
        payload: {
          currentUser: newProfile,
        },
      });
      Message.success('Perfil actualizado correctamente');
      getHistory().push('/');
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: actions.UPDATE_PROFILE_ERROR,
      });
    }
  },
};

export default actions;
