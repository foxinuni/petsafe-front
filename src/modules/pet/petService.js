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

  static async doCreate(pet, token) {
    if (pet.me) {
      await axios.post(
        `${backend}/pets/me`,
        {
          userId: pet.owner,
          breedId: pet.breed,
          stateId: pet.state,
          name: pet.name,
          age: pet.age,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
    } else {
      await axios.post(
        `${backend}/pets`,
        {
          userId: pet.owner,
          breedId: pet.breed,
          stateId: pet.state,
          name: pet.name,
          age: pet.age,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
    }
  }
}
