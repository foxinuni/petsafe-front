export default class BookingService {
  static async update(id, data) {}

  static async destroyAll(ids) {}

  static async create(data) {}

  static async import(values, importHash) {}

  static async find(id) {
    return {
      id: 48,
      owner: {
        id: 14,
        fullName: 'juan diego',
        email: 'diego@gmail.com',
      },
      pet: {
        id: 15,
        name: 'pedro',
      },
      arrival: '145',
      departure: '14555',
      clientNotes: 'que lo cuiden bien porfa',
      employeeNotes: 'se ha portado bien',
      status: 'In Progress',
      cancellationNotes: null,
      fee: 254.25,
      receipt: {
        id: 20,
        name: 'no entiendo que es esto',
        sizeInBytes: 10,
        publicUrl: 'publica.com',
        privateUrl: 'privada.com',
      },
      photos: [
        {
          id: 10000,
          name: 'comiendo',
          sizeInBytes: 50,
          publicUrl: 'publica.com',
          privateUrl: 'private.com',
        },
      ],
      updateAt: '2222',
      createdAt: '222',
    };
  }

  static async list(filter, orderBy, limit, offset) {
    return {
      rows: [
        {
          id: 48,
          owner: {
            id: 14,
            fullName: 'juan diego',
            email: 'diego@gmail.com',
          },
          pet: {
            id: 15,
            name: 'pedro',
          },
          arrival: '145',
          departure: '14555',
          clientNotes: 'que lo cuiden bien porfa',
          employeeNotes: 'se ha portado bien',
          status: 'In Progress',
          cancellationNotes: null,
          fee: 254.25,
          receipt: {
            id: 20,
            name: 'no entiendo que es esto',
            sizeInBytes: 10,
            publicUrl: 'publica.com',
            privateUrl: 'privada.com',
          },
          updateAt: '2222',
          createdAt: '222',
        },
      ],
      count: 2,
    };
  }

  static async listAutocomplete(query, limit) {}
}
