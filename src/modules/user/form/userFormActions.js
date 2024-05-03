import Errors from 'modules/error/errors';
import Message from 'view/shared/message';
import service from 'modules/user/userService';
import { getHistory } from 'modules/store';
import authSelectors from 'modules/auth/authSelectors';

const prefix = 'USER_FORM';

const actions = {
  RESET: `${prefix}_RESET`,

  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doNew: () => {
    return {
      type: actions.RESET,
    };
  },

  //modificar este para que obtenga el usuario por partes, osea user, y luego profile.
  doFind: (id, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.FIND_STARTED,
      });
      const user = await service.find(id, token);

      dispatch({
        type: actions.FIND_SUCCESS,
        payload: user,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.FIND_ERROR,
      });

      getHistory().push('/user');
    }
  },

  //modiifcar este para que cree por aparte el user y el profile
  doAdd: (values, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.ADD_STARTED,
      });
      await service.create(values, token);

      dispatch({
        type: actions.ADD_SUCCESS,
      });

      Message.success('Usuario creado exitosamente');

      getHistory().push('/user');
    } catch (error) {
      Errors.handle(error, dispatch, '/user');
      dispatch({
        type: actions.ADD_ERROR,
      });
    }
  },

  //este en teoria se queda igual pero es verificar que el rol se envie como id
  doUpdate:
    (id, values, token) => async (dispatch, getState) => {
      try {
        dispatch({
          type: actions.UPDATE_STARTED,
        });
        await service.edit(id, values, token);

        dispatch({
          type: actions.UPDATE_SUCCESS,
        });

        const currentUser = authSelectors.selectCurrentUser(
          getState(),
        );

        Message.success('Usuario actualizado exitosamente');

        getHistory().push('/user');
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: actions.UPDATE_ERROR,
        });
      }
    },
};

export default actions;
