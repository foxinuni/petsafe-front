import axios from 'axios';
import { backend } from 'config/development';
import petService from 'modules/pet/petService';
import userService from 'modules/user/userService';

export default class ReservService {
  static async create(values, petId, token) {
    await axios.post(
      `${backend}/reservations`,
      {
        pet_id: petId,
        description: values.clientNotes,
        start_date: values.startDate,
        end_date: values.endDate,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  }
  //deprecated
  static async getStates(token) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'Pendiente',
            id: 'd0f73fbc-89ee-4ee6-b6d3-b435c5df54c2',
          },
          {
            name: 'En proceso',
            id: 'ebe325c3-a363-4785-9790-369ab6dac3e8',
          },
        ]);
      }, 500);
    });
  }

  static async find(id, token) {
    const response = await axios.get(`${backend}/reservations/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async getAll(
    filter,
    orderBy,
    limit = 10,
    offset = 1,
    token,
    currentUser,
  ) {
    let query = '';
    if (filter.owner) query += `userId=${filter.owner}&`;
    query = query.slice(0, -1);
    query += `&limit=${limit}&page=${offset}`;
    const path = filter.me
      ? `${backend}/reservations/me?${query}`
      : `${backend}/reservations?${query}`;
    const response = await axios.get(path, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const returning = { rows: [] };
    let permissUsers = true;
    let permissPets = true;
    for (const reserv of response.data) {
      let creator = null;
      let pet = null;
      if (permissUsers) {
        try {
          creator = await userService.findProfile(reserv.creator_id, token);
        } catch (error) {
          permissUsers = false;
          creator = null;
        }
      }
      if (permissPets) {
        try {
          pet = await petService.findPet(reserv.pet_id, token);
        } catch (error) {
          permissPets = false;
          pet = null;
        }
      }
      returning.rows.push({
        id: reserv.id,
        creator: creator ? `${creator.name} ${creator.surname}` : '',
        pet: pet.name,
        arrival: reserv.start_date,
        departure: reserv.end_date,
      });
    }
    returning.count = 50; //by now
    return returning;
  }
}
