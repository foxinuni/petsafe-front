import axios from 'axios';
import userService from 'modules/user/userService';
import { backend } from 'config/development';

export default class PetService {
  static async delete(id, token) {
    await axios.delete(`${backend}/pets/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  static async edit(pet, values, token) {
    let url = '/pets/';
    if (values.me) url = '/pets/me/';
    await axios.patch(
      `${backend}${url}${pet.id}`,
      {
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

  static async findPet(id, token) {
    const response = await axios.get(`${backend}/pets/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return {
      ...response.data,
      createdAt: response.data.created_at,
      updatedAt: response.data.updated_at,
    };
  }

  static async findBreed(id, token) {
    const response = await axios.get(`${backend}/pets/breeds/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async findType(id, token) {
    const response = await axios.get(`${backend}/pets/types/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

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
          type_id: values.type,
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
          breed_id: values.breed,
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
          user_id: values.owner,
          breed_id: values.breed,
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

  static async fetchPets(
    filter,
    orderBy,
    limit = 10,
    offset = 1,
    token,
    currentUser,
  ) {
    let query = '';
    for (const key in filter) {
      if (!filter[key]?.since && filter[key] && key != 'me') {
        query += `${key}=${filter[key]}&`;
      } else {
        if (filter[key]?.since) query += `createdSince=${filter[key].since}&`;
        if (filter[key]?.to) query += `createdTo=${filter[key].to}&`;
      }
    }
    if (orderBy?.field && orderBy?.order) {
      query += `orderBy=${orderBy.field}&orderType=${orderBy.order}&`;
    }
    query = query.slice(0, -1);
    query += `&limit=${limit}&page=${offset}`;
    const path = filter.me
      ? `${backend}/pets/me?${query}`
      : `${backend}/pets?${query}`;

    const response = await axios.get(path, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const returning = { rows: [] };
    let permissUsers = true;
    for (const pet of response.data) {
      let owner = null;
      if (filter.me) {
        owner = { name: currentUser.name, surname: currentUser.surname };
      } else if (permissUsers) {
        try {
          owner = await userService.findProfile(pet.user_id, token);
        } catch (error) {
          permissUsers = false;
        }
      }
      const breed = await PetService.findBreed(pet.breed_id, token);
      returning.rows.push({
        id: pet.id,
        owner: owner ? `${owner.name} ${owner.surname}` : null,
        name: pet.name,
        breed: breed.name,
        age: pet.age,
        createdAt: pet.created_at,
      });
    }
    returning.count = 1000;
    return returning;
  }
}
