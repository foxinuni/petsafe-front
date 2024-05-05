import axios from 'axios';
import { backend } from 'config/development';

export default class UserService {
  static async edit(id, data, token) {
    await axios.patch(
      `${backend}/profiles/${id}`,
      {
        name: data.name,
        surname: data.surname,
        number: data.number,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  }

  static async createUser(data, token) {
    const response = await axios.post(`${backend}/auth/register`, {
      email: data.email,
      password: data.password,
      role: data.roles,
    });
    return response.data;
  }

  static async createProfile(id, data, token) {
    await axios.post(
      `${backend}/profiles`,
      {
        id: id,
        name: data.name,
        surname: data.surname,
        number: data.number,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  }

  static async findProfile(id, token) {
    const response = await axios.get(`${backend}/profiles/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  }

  static async fetchUsers(filter, orderBy, limit = 10, offset = 1, token) {
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
    const response = await axios.get(`${backend}/profiles?${query}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const returning = {};
    returning.rows = response.data.rows.map((profile) => ({
      ...profile,
      name: `${profile.name} ${profile.surname}`,
      id: profile.id,
      disabled: false, //by now since the backend has not implemented the status yet
    }));
    returning.count = parseInt(response.data.count);
    return returning;
  }
}
