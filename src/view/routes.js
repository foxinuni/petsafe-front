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
    permissionRequired: permissions.permUserView,
    exact: true,
    icon: 'user-add',
    label: 'Usuarios',
    menu: true,
  },
  {
    path: '/user/new',
    loader: () => import('view/user/new/UserNewPage'),
    menu: false,
    permissionRequired: permissions.permUserManage,
    exact: true,
  },
  {
    path: '/user/:id/edit',
    loader: () => import('view/user/edit/UserEditPage'),
    menu: false,
    permissionRequired: permissions.permUserManage,
    exact: true,
  },

  /* {
    path: '/audit-logs',
    icon: 'file-search',
    label: 'Logs',
    loader: () => import('view/auditLog/AuditLogPage'),
    menu: true,
    permissionRequired: permissions.auditLogRead,
  },*/

  {
    path: '/pet',
    loader: () => import('view/pet/list/PetListPage'),
    permissionRequired: permissions.permPetsView,
    exact: true,
    icon: 'right',
    label: 'Mascotas',
    menu: true,
  },
  {
    path: '/pet/new',
    loader: () => import('view/pet/form/PetFormPage'),
    menu: false,
    permissionRequired: permissions.permPetsSelf,
    exact: true,
  },
  {
    path: '/pet/:id/edit',
    loader: () => import('view/pet/form/PetFormPage'),
    menu: false,
    permissionRequired: permissions.permPetsSelf,
    exact: true,
  },
  {
    path: '/pet/:id',
    loader: () => import('view/pet/view/PetViewPage'),
    menu: false,
    permissionRequired: permissions.permPetsView,
    exact: true,
  },

  {
    path: '/booking',
    loader: () =>
      import('view/booking/list/BookingListPage'),
    permissionRequired: permissions.permReservationsSelf,
    exact: true,
    icon: 'right',
    label: 'Reservas',
    menu: true,
  },
  {
    path: '/booking/new',
    loader: () =>
      import('view/booking/form/BookingFormPage'),
    menu: false,
    permissionRequired: permissions.permReservationsSelf,
    exact: true,
  },
  {
    path: '/booking/:id/edit',
    loader: () =>
      import('view/booking/form/BookingFormPage'),
    menu: false,
    permissionRequired: permissions.permReservationsSelf,
    exact: true,
  },
  {
    path: '/booking/:id',
    loader: () =>
      import('view/booking/view/BookingViewPage'),
    menu: false,
    permissionRequired: permissions.permReservationsSelf,
    exact: true,
  },
  {
    path: '/roles',
    loader: () => import('view/rol/RolListPage'),
    menu: true,
    permissionRequired: permissions.permRolesView,
    exact: true,
    icon: 'right',
    label: 'Roles',
  },
  {
    path: '/roles/:id/edit',
    loader: () => import('view/rol/RolEditPage'),
    menu: false,
    permissionRequired: permissions.permRolesManage,
    exact: true,
  },
  {
    path: '/roles/new',
    loader: () => import('view/rol/RolNewPage'),
    menu: false,
    permissionRequired: permissions.permRolesManage,
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
