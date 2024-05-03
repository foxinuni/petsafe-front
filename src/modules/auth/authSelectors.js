import { createSelector } from 'reselect';

const selectRaw = (state) => state.auth;

const selectToken = createSelector(
  [selectRaw],
  (auth) => auth.token,
);

const selectAuthenticationUser = createSelector(
  [selectRaw],
  (auth) => auth.authenticationUser,
);

const selectCurrentUser = createSelector(
  [selectRaw],
  (auth) => auth.currentUser,
);

const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser.email : null),
);

const selectCurrentUserFullName = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    currentUser ? currentUser.fullName : '',
);

const selectSignedIn = createSelector(
  [selectCurrentUser],
  (currentUser) => !!currentUser,
);

const selectRoles = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    currentUser ? currentUser.roles || [] : [],
);

const selectEmptyPermissions = createSelector(
  [selectRoles],
  (roles) => !roles || !roles.length,
);

const selectLoading = createSelector(
  [selectRaw],
  (auth) => !!auth.loading,
);

const selectLoadingInit = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingInit,
);

const selectLoadingEmailConfirmation = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingEmailConfirmation,
);

const selectLoadingPasswordReset = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingPasswordReset,
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
  selectToken,
  selectLoadingPasswordReset,
  selectLoadingEmailConfirmation,
  selectLoadingInit,
  selectLoadingUpdateProfile,
  selectLoading,
  selectEmptyPermissions,
  selectRoles,
  selectSignedIn,
  selectCurrentUserFullName,
  selectCurrentUserEmail,
  selectCurrentUser,
  selectAuthenticationUser: selectAuthenticationUser,
  selectErrorMessage,
  selectRaw,
};

export default selectors;
