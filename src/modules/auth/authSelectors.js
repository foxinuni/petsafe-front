import { createSelector } from 'reselect';

const selectRaw = (state) => state.auth;

const selectCurrentUser = createSelector(
  [selectRaw],
  (auth) => auth.currentUser,
);

const selectLoading = createSelector([selectRaw], (auth) => !!auth.loading);

const selectLoadingInit = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingInit,
);

const selectLoadingUpdateProfile = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingUpdateProfile,
);

const selectErrorMessage = createSelector(
  [selectRaw],
  (auth) => auth.errorMessage,
);

const selectors = {
  selectLoadingInit,
  selectLoadingUpdateProfile,
  selectLoading,
  selectCurrentUser,
  selectErrorMessage,
  selectRaw,
};

export default selectors;
