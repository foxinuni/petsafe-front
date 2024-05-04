import service from 'modules/rol/rolService';
import Message from 'view/shared/message';
import Errors from 'modules/error/errors';
import { getHistory } from 'modules/store';

const prefix = 'ROL';

const actions = {
  RESET: `${prefix}_RESET`,
  ROL_START: `${prefix}_START`,
  ROL_LIST_SUCCESS: `${prefix}_LIST_SUCCESS`,
  ROL_LIST_ERROR: `${prefix}_LIST_ERROR`,

  ROL_SUCCESS: `${prefix}_SUCCESS`,
  ROL_ERROR: `${prefix}_ERROR`,

  UPDATE_START: `${prefix}_UPDATE_START`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  CREATE_START: `${prefix}_CREATE_START`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  doClearErrorMessage() {
    return {
      type: actions.ERROR_MESSAGE_CLEARED,
    };
  },

  doNew: () => {
    return {
      type: actions.RESET,
    };
  },

  getAllRoles: (token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.ROL_START,
      });
      const roles = await service.getAll(token);
      dispatch({
        type: actions.ROL_LIST_SUCCESS,
        payload: {
          roles: roles,
        },
      });
    } catch (error) {
      Errors.handle(error, dispatch, '/');
      dispatch({
        type: actions.ROL_LIST_ERROR,
      });
    }
  },

  doFind: (id, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.ROL_START,
      });

      const role = await service.find(id, token);
      if (role) {
        dispatch({
          type: actions.ROL_SUCCESS,
          payload: { role: role },
        });
      } else {
        dispatch({
          type: actions.ROL_ERROR,
          payload: { role: null },
        });
      }
    } catch (error) {
      Errors.handle(error, dispatch, '/roles');
      dispatch({
        type: actions.ROL_ERROR,
        payload: { role: null },
      });
    }
  },

  doUpdate: (data, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.UPDATE_START,
      });

      await service.doUpdate(data, token);

      dispatch({
        type: actions.UPDATE_SUCCESS,
      });

      Message.success('Rol actualizado');
      getHistory().push('/roles');
    } catch (error) {
      Errors.handle(error, dispatch, '/roles');
      dispatch({
        type: actions.UPDATE_ERROR,
      });
    }
  },

  doCreate: (data, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.CREATE_START,
      });

      await service.create(data, token);

      dispatch({
        type: actions.CREATE_SUCCESS,
      });

      Message.success('Rol creado');
      getHistory().push('/roles');
    } catch (error) {
      Errors.handle(error, dispatch, '/roles');
      dispatch({
        type: actions.CREATE_ERROR,
      });
    }
  },

  doDestroy: (id, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.DESTROY_STARTED,
      });

      await service.delete(id, token);

      dispatch({
        type: actions.DESTROY_SUCCESS,
      });
      Message.success('Rol eliminado correctamente');

      getHistory().push('/roles');
    } catch (error) {
      Errors.handle(error, dispatch, '/roles');
      dispatch({
        type: actions.DESTROY_ERROR,
      });
    }
  },
};

export default actions;
