import service from 'modules/reservation/reservService';
import Error from 'modules/error/errors';
import userService from 'modules/user/userService';
import petService from 'modules/pet/petService';

const prefix = 'RESERV_FORM';

const actions = {
  RESET: `${prefix}_RESET`,
  RESET_OWNER: `${prefix}_RESET_OWNER`,

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
  resetOwner: () => async (dispatch) => {
    dispatch({ type: actions.OWNER_RESET });
  },

  getStates: (token) => async (dispatch) => {
    try {
      const states = await service.getStates(token);
      console.log(states);
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
};

export default actions;
