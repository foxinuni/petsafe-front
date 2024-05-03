/*import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';*/

export default class PetService {
  static async update(id, data) {
    /* const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_UPDATE(
          $id: String!
          $data: PetInput!
        ) {
          petUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.petUpdate;*/
    return null;
  }

  static async destroyAll(ids) {
    /* const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_DESTROY($ids: [String!]!) {
          petDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.petDestroy;*/
    return null;
  }

  static async create(data) {
    /* const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_CREATE($data: PetInput!) {
          petCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.petCreate;*/
    return null;
  }

  static async import(values, importHash) {
    /*const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_IMPORT(
          $data: PetInput!
          $importHash: String!
        ) {
          petImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.petImport;*/
    return null;
  }

  static async find(id) {
    //este devuelve la informacion de la mascota cuando uno oprime en view
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
    /*const response = await graphqlClient.query({
      query: gql`
        query PET_FIND($id: String!) {
          petFind(id: $id) {
            id
            owner {
              id
              fullName
              email
            }
            name
            type
            breed
            size
            bookings {
              id
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

    return response.data.petFind;*/
  }

  static async list(filter, orderBy, limit, offset) {
    //este devuelve toda la lista de mascotas para mostrar en la tabla
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
    /*const response = await graphqlClient.query({
      query: gql`
        query PET_LIST(
          $filter: PetFilterInput
          $orderBy: PetOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          petList(
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
              name
              type
              breed
              size
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

    return response.data.petList;*/
  }

  static async listAutocomplete(query, limit) {
    /* const response = await graphqlClient.query({
      query: gql`
        query PET_AUTOCOMPLETE(
          $query: String
          $limit: Int
        ) {
          petAutocomplete(query: $query, limit: $limit) {
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

    return response.data.petAutocomplete;*/
    return null;
  }
}
