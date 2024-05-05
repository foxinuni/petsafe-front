import Errors from 'modules/error/errors';
import Message from 'view/shared/message';
import service from 'modules/pet/petService';
import userService from 'modules/user/userService';
import { getHistory } from 'modules/store';
import roleService from 'modules/rol/rolService';
import authService from 'modules/auth/authService';

import { dateToString } from 'modules/shared/dates';

const prefix = 'PET_FORM';

const actions = {
  RESET: `${prefix}_RESET`,

  TYPES_STARTED: `${prefix}_TYPES_STARTED`,
  TYPES_SUCCESS: `${prefix}_TYPES_STARTED`,

  BREEDS_STARTED: `${prefix}_BREEDS_STARTED`,
  BREEDS_SUCCESS: `${prefix}_BREEDS_STARTED`,

  USERS_STARTED: `${prefix}_USERS_STARTED`,
  USERS_SUCCESS: `${prefix}_USERS_STARTED`,

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

  getAllTypes: (token) => async (dispatch) => {
    try {
      const types = await service.getTypes(token);
      dispatch({
        type: actions.TYPES_SUCCESS,
        payload: {
          types,
        },
      });
    } catch (error) {
      Errors.handle(error, dispatch, '/');
    }
  },

  getAllUsers: (token) => async (dispatch) => {
    try {
      const users = await userService.fetchUsers(null, null, 100, 0, token);
      dispatch({
        type: actions.USERS_SUCCESS,
        payload: {
          users: users,
        },
      });
    } catch (error) {
      Errors.handle(error, dispatch, '/');
    }
  },
  getAllBreeds: (token) => async (dispatch) => {
    try {
      const breeds = await service.getBreeds(token);
      dispatch({
        type: actions.BREEDS_SUCCESS,
        payload: {
          breeds,
        },
      });
    } catch (error) {
      Errors.handle(error, dispatch, '/pet');
    }
  },
  doFind: (id, token) => async (dispatch) => {
    /*try {
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
    }*/
  },

  doAdd: (values, token) => async (dispatch) => {
    /*try {
      dispatch({
        type: actions.ADD_STARTED,
      });
      const userId = await service.createUser(values);
      console.log('a ver que retorno el user');
      console.log(userId);
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
    }*/
  },

  doUpdate: (id, values, token) => async (dispatch) => {
    /* try {
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
    }*/
  },
};

export default actions;