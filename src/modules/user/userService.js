import axios from 'axios';
import { backend } from 'config/development';

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
    if (filter?.email) query += `email=${filter.email}&`;
    if (filter?.fullName) query += `name=${filter.fullName}&`;
    if (filter?.role) query += `rol=${filter.role}&`;
    if (filter?.status) query += `status=${filter.status}&`;
    if (filter?.createdAt) {
      //  const beginning = filter.createdAtRange[0].format();
      //  const beginEncoded = encodeURIComponent(beginning);
      // query += `createdFrom=${beginEncoded}&`;
      // const ending = filter.createdAtRange[1].format();
      // const endingEncoded = encodeURIComponent(ending);
      // query += `createdTo=${endingEncoded}&`;
    }
    query = query.slice(0, -1);
    query += `&limit=${limit}&page=${offset}`;
    const response = await axios.get(`${backend}/profiles?${query}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    const returning = {};
    returning.rows = response.data.map((profile) => ({
      id: profile.id,
      name: `${profile.name} ${profile.surname}`,
      phoneNumber: profile.number,
      email: profile.email,
      rol: profile.rol,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      disabled: false, //by now since the backend has not implemented the status yet
    }));
    returning.count = 50; //the count it's supossed to be retrieved through another axios call maybe,
    //will talk with augusto, for now lets leave it as 50 to prove that the pagination works
    return returning;
  }
}
