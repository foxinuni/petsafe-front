import axios from 'axios';
import { backend } from 'config/development';
import roleService from 'modules/rol/rolService';
import authService from 'modules/auth/authService';

export default class UserService {
  static async edit(id, data, token) {
    await axios.patch(
      `${backend}/profiles/${id}`,
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

  static async createUser(data, token) {
    const response = await axios.post(
      `${backend}/users`,
      {
        email: data.email,
        password: data.password,
        role_id: data.roles,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  static async createProfile(profile, token) {
    await axios.post(
      `${backend}/profiles`,
      {
        ...profile,
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
    return response.data;
  }

  static async fetchUsers(filter, orderBy, limit = 10, offset = 1, token) {
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
    query += `limit=${limit}&page=${offset}`;
    console.log(query);
    const response = await axios.get(`${backend}/profiles?${query}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const returning = { rows: [] };
    for (const profile of response.data) {
      const user = await authService.findUser(profile.id, token);
      const role = await roleService.find(user.role_id, token);
      returning.rows.push({
        name: `${profile.name} ${profile.surname}`,
        id: profile.id,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
        rol: role.rolName,
        email: user.email,
      });
    }
    returning.count = 1000;
    return returning;
  }
}
