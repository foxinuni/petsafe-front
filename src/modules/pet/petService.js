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

  static async getBreeds(token, type) {
    let query = '';
    if (type) query = `?type=${type}`;
    const response = await axios.get(`${backend}/pets/breeds${query}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  static async doCreate(values, token) {
    if (values.newType) {
      const newType = await axios.post(
        `${backend}/pets/types`,
        {
          name: values.newType,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      values.type = newType.data.id;
    }
    if (values.newBreed) {
      const newBreed = await axios.post(
        `${backend}/pets/breeds`,
        {
          typeId: values.type,
          name: values.newBreed,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      values.breed = newBreed.data.id;
    }
    if (values.me) {
      await axios.post(
        `${backend}/pets/me`,
        {
          userId: values.owner,
          breedId: values.breed,
          stateId: values.state,
          name: values.name,
          age: values.age,
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
          userId: values.owner,
          breedId: values.breed,
          stateId: values.state,
          name: values.name,
          age: values.age,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
    }
  }

  static async fetchPets(filter, orderBy, limit = 10, offset = 0, token) {
    let query = '';
    for (const key in filter) {
      if (!filter[key].since) {
        query += `${key}=${filter[key]}&`;
      } else {
        query += `createdSince=${filter[key].since}&`;
        query += `createdTo=${filter[key].to}&`;
      }
    }
    if (orderBy) {
      query += `orderBy=${orderBy.field}&orderType=${orderBy.order}&`;
    }
    query = query.slice(0, -1);
    query += `&limit=${limit}&page=${offset}`;
    console.log(query);
    const response = await axios.get(`${backend}/pets?${query}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const returning = {};
    returning.rows = response.data.map((pet) => ({
      owner: {
        id: 'sssss',
        label: 'juan diego',
      },
      name: pet.name,
      type: 'nose',
      breed: pet.breedId,
      state: pet.stateId,
      age: pet.age,
      createdAt: pet.createdAt,
    }));
    //returning.count = parseInt(response.data.count);
    returning.count = 50;
    return returning;
  }
}
