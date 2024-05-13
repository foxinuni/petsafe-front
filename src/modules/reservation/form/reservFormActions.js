import service from 'modules/reservation/reservService';
import Error from 'modules/error/errors';
import userService from 'modules/user/userService';
import petService from 'modules/pet/petService';
import { momentUnix, momentToUnix } from 'modules/shared/dates';
import Message from 'view/shared/message';
import { getHistory } from 'modules/store';

const prefix = 'RESERV_FORM';

const actions = {
  RESET: `${prefix}_RESET`,
  RESET_FEE: `${prefix}_RESET_FEE`,
  FEE_CHANGED: `${prefix}_FEE_CHANGED`,
  PET_FIND_ERROR: `${prefix}_PET_FIND_ERROR`,
  PET_FIND_SUCCESS: `${prefix}_PET_FIND_SUCCESS`,

  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  STATES_FETCH_SUCCESS: `${prefix}_STATES_FETCH_SUCCESS`,
  STATES_FETCH_ERROR: `${prefix}_STATES_FETCH_ERROR`,

  OWNERS_FETCH_SUCCESS: `${prefix}_OWNERS_FETCH_SUCCESS`,
  OWNERS_FETCH_ERROR: `${prefix}_OWNERS_FETCH_ERROR`,
  OWNER_RESET: `${prefix}_OWNER_RESET`,

  PETS_FETCH_SUCCESS: `${prefix}_PETS_FETCH_SUCCESS`,
  PETS_FETCH_ERROR: `${prefix}_PETS_FETCH_ERROR`,
  PETS_RESET: `${prefix}_PETS_RESET`,
  PET_RESET: `${prefix}_PET_RESET`,

  doNew: () => {
    return {
      type: actions.RESET,
    };
  },

  newFee: (dates) => {
    let price = 0;
    if (dates[0] && dates[1])
      price = (momentUnix(dates[1]) - momentUnix(dates[0])) * 0.57;
    return {
      type: actions.FEE_CHANGED,
      payload: price,
    };
  },

  resetFee: () => {
    return {
      type: actions.RESET_FEE,
    };
  },

  seekPet: (token, petId, permissionUser) => async (dispatch) => {
    try {
      const pet = await petService.findPet(petId, token);
      const owner = permissionUser
        ? await userService.findProfile(pet.user_id, token)
        : null;
      dispatch({
        type: actions.PET_FIND_SUCCESS,
        payload: {
          pet: pet,
          owner: owner,
        },
      });
    } catch (error) {
      Error.handle(error, dispatch, '/reservation');
      dispatch({
        type: actions.PET_FIND_ERROR,
      });
    }
  },

  resetOwner: () => async (dispatch) => {
    dispatch({ type: actions.OWNER_RESET });
  },

  getStates: (token) => async (dispatch) => {
    try {
      const states = await service.getStates(token);
      dispatch({
        type: actions.STATES_FETCH_SUCCESS,
        payload: { states },
      });
    } catch (error) {
      Error.handle(error, dispatch, '/');
      dispatch({
        type: actions.STATES_FETCH_ERROR,
      });
    }
  },
  getOwners: (token) => async (dispatch) => {
    try {
      const users = await userService.fetchUsers(null, null, 100, 0, token);
      dispatch({
        type: actions.OWNERS_FETCH_SUCCESS,
        payload: { owners: users.rows },
      });
    } catch (error) {
      Error.handle(error, dispatch, '/');
      dispatch({
        type: actions.OWNERS_FETCH_ERROR,
      });
    }
  },

  getPetsFrom: (token, value) => async (dispatch) => {
    try {
      //change filter to the pets from user selected which is the value passed
      const pets = await petService.fetchPets(null, null, 100, 0, token);
      dispatch({
        type: actions.PETS_FETCH_SUCCESS,
        payload: { pets: pets.rows },
      });
    } catch (error) {
      Error.handle(error, dispatch);
      dispatch({
        type: actions.PETS_FETCH_ERROR,
      });
    }
  },

  resetPets: () => async (dispatch) => {
    dispatch({
      type: actions.PETS_RESET,
    });
  },

  doCreate: (values, petId, token) => async (dispatch) => {
    try {
      if (values.dates && values.dates[0] && values.dates[0]) {
        values.startDate = momentToUnix(values.dates[0]);
        values.endDate = momentToUnix(values.dates[1]);
        await service.create(values, petId, token);
        Message.success('Reserva realizada exitosamente');
        getHistory().push('/reservation');
      } else Message.error('Debe ingresar las fechas');
    } catch (error) {
      Error.handle(error, dispatch, '/reservation');
      dispatch({ type: actions.CREATE_ERROR });
    }
  },
};

export default actions;
