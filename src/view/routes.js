import Permissions from 'authorization/permissions';
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    icon: 'home',
    label: 'Principal',
    menu: {
      exact: true,
    },
    loader: () => import('view/home/HomePage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/profile',
    loader: () => import('view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
    menu: false,
  },

  {
    path: '/user',
    loader: () => import('view/user/list/UserPage'),
    permissionRequired: [permissions.permProfileView],
    exact: true,
    icon: 'user-add',
    label: 'Usuarios',
    menu: true,
  },
  {
    path: '/user/new',
    loader: () => import('view/user/new/UserNewPage'),
    menu: false,
    permissionRequired: [permissions.permProfileManage],
    exact: true,
  },
  {
    path: '/user/:id/edit',
    loader: () => import('view/user/edit/UserEditPage'),
    menu: false,
    permissionRequired: [permissions.permProfileManage],
    exact: true,
  },

  {
    path: '/pet',
    loader: () => import('view/pet/list/PetListPage'),
    permissionRequired: [permissions.permPetsView, permissions.permPetsSelf],
    exact: true,
    icon: 'right',
    label: 'Mascotas',
    menu: true,
  },
  {
    path: '/pet/new',
    //loader: () => import(''),
    menu: false,
    permissionRequired: [permissions.permPetsSelf, permissions.permPetsManage],
    exact: true,
  },
  {
    path: '/pet/:id/edit',
    // loader: () => import(''),
    menu: false,
    permissionRequired: [permissions.permPetsSelf, permissions.permPetsManage],
    exact: true,
  },

  {
    path: '/reservation',
    // loader: () =>import(''),
    permissionRequired: [
      permissions.permReservationsSelf,
      permissions.permReservationsView,
    ],
    exact: true,
    icon: 'right',
    label: 'Reservas',
    menu: true,
  },
  {
    path: '/reservation/new',
    //loader: () => import(''),
    menu: false,
    permissionRequired: [
      permissions.permReservationsSelf,
      permissions.PermReservationsManage,
    ],
    exact: true,
  },
  {
    path: '/reservation/:id/edit',
    // loader: () => import(''),
    menu: false,
    permissionRequired: [
      permissions.permReservationsSelf,
      permissions.PermReservationsManage,
    ],
    exact: true,
  },
  {
    path: '/reservation/:id',
    // loader: () => import(''),
    menu: false,
    permissionRequired: [
      permissions.permReservationsSelf,
      permissions.permReservationsView,
    ],
    exact: true,
  },
  {
    path: '/roles',
    loader: () => import('view/rol/RolListPage'),
    menu: true,
    permissionRequired: [permissions.permRolesView],
    exact: true,
    icon: 'right',
    label: 'Roles',
  },
  {
    path: '/roles/:id/edit',
    loader: () => import('view/rol/RolEditPage'),
    menu: false,
    permissionRequired: [permissions.permRolesManage],
    exact: true,
  },
  {
    path: '/roles/new',
    loader: () => import('view/rol/RolNewPage'),
    menu: false,
    permissionRequired: [permissions.permRolesManage],
    exact: true,
  },
];

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('view/auth/SignupPage'),
  },
];

const errorRoutes = [
  {
    path: '/error',
    loader: () => import('view/shared/errors/ErrorPage'),
  },
  {
    path: '**',
    loader: () => import('view/shared/errors/ErrorPage'),
  },
];

export default {
  privateRoutes,
  publicRoutes,
  errorRoutes,
};
