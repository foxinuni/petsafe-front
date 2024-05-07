import Errors from 'modules/error/errors';
import Message from 'view/shared/message';
import service from 'modules/pet/petService';
import userService from 'modules/user/userService';
import { getHistory } from 'modules/store';
import reservService from 'modules/reservation/reservService';

import { dateToString } from 'modules/shared/dates';

const prefix = 'PET_FORM';

const actions = {
  RESET: `${prefix}_RESET`,

  TYPES_STARTED: `${prefix}_TYPES_STARTED`,
  TYPES_SUCCESS: `${prefix}_TYPES_STARTED`,

  BREEDS_STARTED: `${prefix}_BREEDS_STARTED`,
  BREEDS_SUCCESS: `${prefix}_BREEDS_STARTED`,
  BREEDS_RESET: `${prefix}_BREEDS_RESET`,

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

  resetBreeds: () => async (dispatch) => {
    dispatch({ type: actions.BREEDS_RESET });
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
  getAllBreeds: (token, type) => async (dispatch) => {
    try {
      const breeds = await service.getBreeds(token, type);
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
  doFind:
    (id, token, seeReservs, notMyOwn, currentUser) => async (dispatch) => {
      try {
        dispatch({
          type: actions.FIND_STARTED,
        });
        const pet = await service.findPet(id, token);
        const breed = await service.findBreed(pet.breedId, token);
        const type = await service.findType(breed.typeId, token);
        //pending, when reservations are well
        if (seeReservs) {
          const reservations = await reservService.getAll(
            { petId: id },
            null,
            100,
            1,
            token,
          );
        }
        const owner = notMyOwn
          ? await userService.findProfile(pet.userId, token)
          : {
              name: `${currentUser.name} ${currentUser.surname}`,
              id: currentUser.id,
            };
        //  const reservString = reservations?.map((reservation) => (`${dateToString(reservation.)}`))  not by now since there are no dates
        dispatch({
          type: actions.FIND_SUCCESS,
          payload: {
            id: pet.id,
            name: pet.name,
            age: pet.age,
            owner: owner,
            state: pet.stateId,
            breed: { name: breed.name, id: breed.id },
            type: type.name,
            createdAt: dateToString(pet.createdAt),
            updatedAt: dateToString(pet.updatedAt),
            reservations: '',
          },
        });
      } catch (error) {
        Errors.handle(error, dispatch, '/pet');
        dispatch({
          type: actions.FIND_ERROR,
        });
      }
    },

  doCreate: (values, token) => async (dispatch) => {
    try {
      dispatch({ type: actions.ADD_STARTED });
      await service.doCreate(values, token);
      dispatch({
        type: actions.ADD_SUCCESS,
      });
      Message.success('Mascota agregada exitosamente');
      getHistory().push('/pet');
    } catch (error) {
      Errors.handle(error, dispatch, '/pet');
      dispatch({ type: actions.ADD_ERROR });
    }
  },
  doUpdate: (values, pet, token) => async (dispatch) => {
    try {
      dispatch({
        type: actions.UPDATE_STARTED,
      });
      await service.edit(pet, values, token);
      dispatch({
        type: actions.UPDATE_SUCCESS,
      });

      Message.success('Mascota actualizado exitosamente');

      getHistory().push('/pet');
    } catch (error) {
      Errors.handle(error, dispatch, '/pet');
      dispatch({
        type: actions.UPDATE_ERROR,
      });
    }
  },
};

export default actions;
