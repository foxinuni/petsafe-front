import { backend } from 'config/development';
import axios from 'axios';

export default class AuthService {
  static async registerWithEmailAndPassword(email, password) {
    const user = {
      email: email,
      password: password,
    };
    const response = await axios.post(`${backend}/auth/register`, user);
    delete user.password;
    user.token = response.data.token;
    user.rol = response.data.rol;
    return user;
  }

  static async createProfile(number, name, surname, token) {
    const user = {
      number: number,
      name: name,
      surname: surname,
    };
    const response = await axios.post(`${backend}/profiles/me`, user, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async edit(id, user, token) {
    console.log(user);
    await axios.patch(
      `${backend}/users/${id}`,
      { roleId: user.roleId },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  }

  static async signin(email, password) {
    const credentials = {
      user: { email: email, password: password },
    };
    const response = await axios.post(
      `${backend}/auth/login`,
      credentials.user,
    );
    delete credentials.user.password;
    credentials.token = response.data.token;
    return credentials;
  }

  static async getProfile(credentials) {
    const response = await axios.get(`${backend}/profiles/me`, {
      headers: {
        authorization: `Bearer ${credentials.token}`,
      },
    });
    return response.data;
  }

  static async findUser(id, token) {
    const response = await axios.get(`${backend}/users/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static signout() {}

  static async updateProfile(name, surname, number, token) {
    console.log(`number es ${number} y name es ${name}`);
    const response = await axios.patch(
      `${backend}/profiles/me`,
      {
        name: name,
        surname: surname,
        number: number,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }
}
