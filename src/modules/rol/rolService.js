import { backend } from 'config/development';
import axios from 'axios';

export default class RolService {
  static async getMe(token) {
    const response = await axios.get(
      `${backend}/roles/me`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  static async getAll(token) {
    const response = await axios.get(`${backend}/roles`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async find(id, token) {
    const response = await axios.get(
      `${backend}/roles/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      id: response.data.id,
      rolName: response.data.name,
      permissions: response.data.permissions,
    };
  }

  static async doUpdate(data, token) {
    const response = await axios.patch(
      `${backend}/roles/${data.id}`,
      {
        name: data.rolName,
        permissions: data.permNumber,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  static async create(data, token) {
    const response = await axios.post(
      `${backend}/roles`,
      {
        name: data.rolName,
        permissions: data.permNumber,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  static async delete(id, token) {
    await axios.delete(`${backend}/roles/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}
