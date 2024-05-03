import axios from 'axios';
import { backend } from 'config/development';

export default class UserService {
  static async enable(ids) {
    return this._changeStatus(ids, false);
  }

  static async disable(ids) {
    return this._changeStatus(ids, true);
  }

  static async _changeStatus(ids, disabled) {}

  static async edit(id, data, token) {
    await axios.patch(
      `${backend}/profiles/${id}`,
      {
        profile: {
          id: id,
          name: data.name,
          surname: data.surname,
          number: data.number,
        },
        role: data.roles,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  }

  static async remove(emails, roles, all = false) {}

  static async create(data, token) {
    await axios.post(
      `${backend}/profiles`,
      {
        user: {
          email: data.email,
          password: data.password,
        },
        profile: {
          name: data.name,
          surname: data.surname,
          number: data.number,
        },
        role: data.roles,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  }

  static async find(id, token) {
    const response = await axios.get(
      `${backend}/profiles/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  static async fetchUsers(
    filter,
    orderBy,
    limit = 10,
    offset = 1,
    token,
  ) {
    console.log(
      `en el fetch la pagina es ${offset} con limit ${limit} `,
    );
    let query = '';
    if (filter?.email) {
      query += `email=${filter.email}&`;
    }
    if (filter?.name) {
      query += `name=${filter.name}&`;
    }
    if (filter?.surname) {
      query += `surname=${filter.surname}&`;
    }
    if (filter?.createdAtRange) {
      const beginning = filter.createdAtRange[0].format();
      const beginEncoded = encodeURIComponent(beginning);
      query += `createdFrom=${beginEncoded}&`;
      const ending = filter.createdAtRange[1].format();
      const endingEncoded = encodeURIComponent(ending);
      query += `createdTo=${endingEncoded}&`;
    }
    if (filter?.role) {
      query += `rol=${filter.role}&`;
    }
    if (filter?.status) {
      query += `status=${filter.status}&`;
    }
    query = query.slice(0, -1);
    query += `&limit=${limit}&page=${offset}`;
    console.log(query);
    const response = await axios.get(
      `${backend}/profiles?${query}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    const returning = {};
    console.log(response.data);
    returning.rows = response.data.map((profile) => ({
      id: profile.id,
      name: `${profile.name} ${profile.surname}`,
      phoneNumber: profile.number,
      email: profile.email,
      rol: profile.rol,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      disabled: false,
      avatars: {
        id: 30,
        name: 'nombre',
        sizeInBytes: 10,
        publicUrl: 'publica.com',
        privateUrl: 'privada.com',
      },
    }));
    returning.count = 50;
    console.log(returning);
    return returning;
  }

  static async fetchUserAutocomplete(query, limit) {}
}
