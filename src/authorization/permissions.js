class Permissions {
  static get self() {
    return 81;
  }
  static get values() {
    return {
      permUserView: {
        name: 'permUserView',
        bit: 1 << 2,
      },
      permUserManage: {
        name: 'permUserManage',
        bit: 1 << 3,
      },
      permProfileView: {
        name: 'permProfileView',
        bit: 1 << 5,
      },
      permProfileManage: {
        name: 'permProfileManage',
        bit: 1 << 6,
      },
      permRolesView: {
        name: 'permRolesView',
        bit: 1 << 8,
      },
      permRolesManage: {
        name: 'permRolesManage',
        bit: 1 << 9,
      },
      permPetsSelf: {
        name: 'permPetsSelf',
        bit: 1 << 10,
      },
      permPetsView: {
        name: 'permPetsView',
        bit: 1 << 11,
      },
      permPetsManage: {
        name: 'permPetsManage',
        bit: 1 << 12,
      },
      permReservationsSelf: {
        name: 'permReservationsSelf',
        bit: 1 << 13,
      },
      permReservationsView: {
        name: 'permReservationsView',
        bit: 1 << 14,
      },
      PermReservationsManage: {
        name: 'PermReservationsManage',
        bit: 1 << 15,
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
