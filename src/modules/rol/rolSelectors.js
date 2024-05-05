import { createSelector } from 'reselect';

const selectRaw = (state) => state.rol;
const selectRoles = createSelector([selectRaw], (rol) => {
  return rol.roles;
});

const selectRol = createSelector([selectRaw], (rol) => {
  return rol.currentRole;
});

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.saveLoading,
);

const selectFindLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.findLoading,
);
const selectLoading = createSelector([selectRaw], (raw) => !!raw.loading);

const selectors = {
  selectFindLoading,
  selectSaveLoading,
  selectRoles,
  selectRol,
  selectLoading,
};

export default selectors;
