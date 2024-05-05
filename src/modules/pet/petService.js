import axios from 'axios';
import { backend } from 'config/development';

export default class PetService {
  static async fetchPets(filter, orderBy, limit = 10, offset = 1, token) {}

  static async getTypes(token) {
    const response = await axios.get(`${backend}/pets/types`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  static async getBreeds(token) {
    const response = await axios.get(`${backend}/pets/breeds`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}
