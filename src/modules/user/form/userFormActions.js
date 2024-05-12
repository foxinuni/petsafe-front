import Errors from 'modules/error/errors';
import Message from 'view/shared/message';
import service from 'modules/user/userService';
import { getHistory } from 'modules/store';
import roleService from 'modules/rol/rolService';
import authService from 'modules/auth/authService';
import { dateToString } from 'modules/shared/dates';

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

  doFind: (id, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.FIND_STARTED,
      });
      const profile = await service.findProfile(id, token);
      const user = await authService.findUser(id, token);
      const role = await roleService.find(user.roleId, token);
      dispatch({
        type: actions.FIND_SUCCESS,
        payload: {
          id: user.id,
          email: user.email,
          name: profile.name,
          surname: profile.surname,
          number: profile.number,
          createdAt: dateToString(profile.createdAt),
          updatedAt: dateToString(profile.updatedAt),
          role: role,
        },
      });
    } catch (error) {
      Errors.handle(error, dispatch, '/user');
      dispatch({
        type: actions.FIND_ERROR,
      });
    }
  },

  //Already modified, check the dto in the backend because it only works without validation
  //with dto validation is giving me a headche
  doAdd: (values, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.ADD_STARTED,
      });
      const userId = await service.createUser(values);
      await service.createProfile(userId, values, token);
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

  doUpdate: (id, values, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.UPDATE_STARTED,
      });
      await service.edit(id, values, token);
      const user = {
        roleId: values.role,
      };
      await authService.edit(id, user, token);

      dispatch({
        type: actions.UPDATE_SUCCESS,
      });

      Message.success('Usuario actualizado exitosamente');

      getHistory().push('/user');
    } catch (error) {
      Errors.handle(error, dispatch, '/user');
      dispatch({
        type: actions.UPDATE_ERROR,
      });
    }
  },
};

export default actions;
