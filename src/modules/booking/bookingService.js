//import gql from 'graphql-tag';
//import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class BookingService {
  static async update(id, data) {
    /*const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BOOKING_UPDATE(
          $id: String!
          $data: BookingInput!
        ) {
          bookingUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.bookingUpdate;*/
  }

  static async destroyAll(ids) {
    /*const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BOOKING_DESTROY($ids: [String!]!) {
          bookingDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.bookingDestroy;*/
  }

  static async create(data) {
    /* const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BOOKING_CREATE($data: BookingInput!) {
          bookingCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.bookingCreate;*/
  }

  static async import(values, importHash) {
    /*const response = await graphqlClient.mutate({
      mutation: gql`
        mutation BOOKING_IMPORT(
          $data: BookingInput!
          $importHash: String!
        ) {
          bookingImport(
            data: $data
            importHash: $importHash
          )
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.bookingImport;*/
  }

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
    /* const response = await graphqlClient.query({
      query: gql`
        query BOOKING_FIND($id: String!) {
          bookingFind(id: $id) {
            id
            owner {
              id
              fullName
              email
            }
            pet {
              id
              name
            }
            arrival
            departure
            clientNotes
            employeeNotes
            photos {
              id
              name
              sizeInBytes
              publicUrl
              privateUrl
            }
            status
            cancellationNotes
            fee
            receipt {
              id
              name
              sizeInBytes
              publicUrl
              privateUrl
            }
            createdAt
            updatedAt
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.bookingFind;*/
  }

  static async list(filter, orderBy, limit, offset) {
    //este devuelve la lista de reservas a mostrar en la tabla
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

    /* const response = await graphqlClient.query({
      query: gql`
        query BOOKING_LIST(
          $filter: BookingFilterInput
          $orderBy: BookingOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          bookingList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              owner {
                id
                fullName
                email
              }
              pet {
                id
                name
              }
              arrival
              departure
              clientNotes
              employeeNotes
              status
              cancellationNotes
              fee
              receipt {
                id
                name
                sizeInBytes
                publicUrl
                privateUrl
              }
              updatedAt
              createdAt
            }
          }
        }
      `,

      variables: {
        filter,
        orderBy,
        limit,
        offset,
      },
    });

    return response.data.bookingList;*/
  }

  static async listAutocomplete(query, limit) {
    /* const response = await graphqlClient.query({
      query: gql`
        query BOOKING_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          bookingAutocomplete(
            query: $query
            limit: $limit
          ) {
            id
            label
          }
        }
      `,

      variables: {
        query,
        limit,
      },
    });

    return response.data.bookingAutocomplete;*/
  }
}
