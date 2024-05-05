import { createSelector } from 'reselect';
import PermissionChecker from 'authorization/permissionChecker';
import Permissions from 'authorization/permissions';

const selectRaw = (state) => state.auth;

const selectToken = createSelector([selectRaw], (auth) => auth.token);

const selectPermViewProfiles = createSelector([selectRaw], (auth) =>
  new PermissionChecker(auth.currentUser).match(
    Permissions.values.permProfileView,
  ),
);
const selectPermManageProfiles = createSelector([selectRaw], (auth) =>
  new PermissionChecker(auth.currentUser).match(
    Permissions.values.permProfileManage,
  ),
);
const selectPermViewRoles = createSelector([selectRaw], (auth) =>
  new PermissionChecker(auth.currentUser).match(
    Permissions.values.permRolesView,
  ),
);
const selectPermManageRoles = createSelector([selectRaw], (auth) =>
  new PermissionChecker(auth.currentUser).match(
    Permissions.values.permRolesManage,
  ),
);
const selectPermSelfPets = createSelector([selectRaw], (auth) =>
  new PermissionChecker(auth.currentUser).match(
    Permissions.values.permPetsSelf,
  ),
);
const selectPermViewPets = createSelector([selectRaw], (auth) =>
  new PermissionChecker(auth.currentUser).match(
    Permissions.values.permPetsView,
  ),
);

const selectPermManagePets = createSelector([selectRaw], (auth) =>
  new PermissionChecker(auth.currentUser).match(
    Permissions.values.permPetsManage,
  ),
);

const selectPermSelfReserv = createSelector([selectRaw], (auth) =>
  new PermissionChecker(auth.currentUser).match(
    Permissions.values.permReservationsSelf,
  ),
);

const selectPermViewReserv = createSelector([selectRaw], (auth) =>
  new PermissionChecker(auth.currentUser).match(
    Permissions.values.permReservationsView,
  ),
);

const selectPermManageReserv = createSelector([selectRaw], (auth) =>
  new PermissionChecker(auth.currentUser).match(
    Permissions.values.PermReservationsManage,
  ),
);

const selectors = {
  selectToken,
  selectPermViewProfiles,
  selectPermManageProfiles,
  selectPermViewRoles,
  selectPermManageRoles,
  selectPermManageReserv,
  selectPermSelfPets,
  selectPermViewPets,
  selectPermManagePets,
  selectPermSelfReserv,
  selectPermViewReserv,
};

export default selectors;
