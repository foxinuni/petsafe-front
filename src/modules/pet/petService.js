export default class PetService {
  static async update(id, data) {
    return null;
  }

  static async destroyAll(ids) {
    return null;
  }

  static async create(data) {
    return null;
  }

  static async import(values, importHash) {
    return null;
  }

  static async find(id) {
    return {
      id: 15,
      owner: {
        id: 14,
        fullName: 'juan diego',
        email: 'diego@gmail.com',
      },
      name: 'pedro',
      type: 'perronegro',
      breed: 'pastor',
      size: 'big',
      updateAt: '1520',
      createdAt: '156',
      bookings: [48],
    };
  }

  static async list(filter, orderBy, limit, offset) {
    return Promise.resolve({
      rows: [
        {
          id: 15,
          owner: {
            id: 14,
            fullName: 'juan diego',
            email: 'diego@gmail.com',
          },
          name: 'pedro',
          type: 'perronegro',
          breed: 'pastor',
          size: 'big',
          updateAt: '1520',
          createdAt: '156',
        },
        {
          id: 20,
          owner: {
            id: 15,
            fullName: 'Gabriela ',
            email: 'gabi@gmail.com',
          },
          name: 'marmol',
          type: 'gato grosero',
          breed: 'michi',
          size: 'mediano',
          updateAt: '1520',
          createdAt: '156',
        },
      ],
      count: 2,
    });
  }

  static async listAutocomplete(query, limit) {
    return null;
  }
}
