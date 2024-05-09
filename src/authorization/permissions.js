class Permissions {
  static get self() {
    return 81;
  }
  static get values() {
    return {
      permProfileView: {
        name: 'permProfileView',
        label: 'Ver perfiles',
        bit: (1 << 5) + (1 << 2), //so it combines user and profile
      },
      permProfileManage: {
        name: 'permProfileManage',
        label: 'Editar/crear perfiles',
        bit: (1 << 6) + (1 << 3), //so it combines user and profile
        prereq: (1 << 5) + (1 << 2),
      },
      permRolesView: {
        name: 'permRolesView',
        label: 'Ver roles',
        bit: 1 << 8,
      },
      permRolesManage: {
        name: 'permRolesManage',
        label: 'Editar/ver roles',
        bit: 1 << 9,
        prereq: 1 << 8,
      },
      permPetsSelf: {
        name: 'permPetsSelf',
        label: 'Tener mascotas propias',
        bit: 1 << 10,
      },
      permPetsView: {
        name: 'permPetsView',
        label: 'Ver mascotas todos',
        bit: 1 << 11,
      },
      permPetsManage: {
        name: 'permPetsManage',
        label: 'Editar/crear mascotas todos',
        bit: 1 << 12,
        prerq: 1 << 11,
      },
      permReservationsSelf: {
        name: 'permReservationsSelf',
        label: 'Tener reservaciones',
        bit: 1 << 13,
      },
      permReservationsView: {
        name: 'permReservationsView',
        label: 'Ver reservaciones todos',
        bit: 1 << 14,
      },
      PermReservationsManage: {
        name: 'PermReservationsManage',
        label: 'Editar/crear reservaciones todos',
        bit: 1 << 15,
        prerq: 1 << 14,
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
