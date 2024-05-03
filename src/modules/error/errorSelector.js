import { createSelector } from 'reselect';

const selectRaw = (state) => state.error;

const selectMessage = createSelector(
  [selectRaw],
  (error) =>
    error.errorMessage || 'La pagia buscada no existe',
);

const selectCode = createSelector(
  [selectRaw],
  (error) => error.errorCode || 500,
);

const selectors = {
  selectCode,
  selectMessage,
};

export default selectors;
