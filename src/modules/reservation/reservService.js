import axios from 'axios';
import { backend } from 'config/development';

export default class ReservService {
  static async getStates(token) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'completed',
            id: 'sdjfhkjsdhfjk',
          },
          {
            name: 'cancelled',
            id: 'shdfjshjsdfds21423',
          },
        ]);
      }, 500);
    });
  }

  static async getAll(filter, orderBy, limit = 10, offset = 1, token) {
    let query = '';
    for (const key in filter) {
      if (!filter[key].since) {
        query += `${key}=${filter[key]}&`;
      }
    }
    if (orderBy) {
      query += `orderBy=${orderBy.field}&orderType=${orderBy.order}&`;
    }
    query = query.slice(0, -1);
    query += `&limit=${limit}&page=${offset}`;
    console.log(query);
    const response = await axios.get(`${backend}/reservations?${query}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const returning = { rows: [] };
    returning.rows = response.data.map((reservation) => ({
      ...reservation,
    }));
    returning.count = 50; //by now
    return returning;
  }
}
