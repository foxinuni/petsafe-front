import { createSelector } from 'reselect';
import authSelectors from 'modules/auth/authSelectors';
import PermissionChecker from 'modules/auth/permissionChecker';
import Permissions from 'authorization/permissions';
import paginationSelectors from 'modules/shared/pagination/paginationSelectors';

const selectRaw = (state) => state.rol;
const unlimited = true;
const selectRoles = createSelector([selectRaw], (rol) => {
  return rol.roles;
});
const selectPermissionToRead = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.permRolesView,
    ),
);

const selectRol = createSelector([selectRaw], (rol) => {
  return rol.currentRole;
});

const selectPermissionToEdit = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.permRolesManage,
    ),
);

const selectPermissionToCreate = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.permRolesManage,
    ),
);
const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.saveLoading,
);

const selectFindLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.findLoading,
);
const selectLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.loading,
);

const selectors = {
  selectFindLoading,
  selectSaveLoading,
  selectPermissionToRead,
  selectPermissionToEdit,
  selectPermissionToCreate,
  selectRoles,
  selectRol,
  selectLoading,
};

export default selectors;
