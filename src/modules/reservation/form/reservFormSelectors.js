import { createSelector } from 'reselect';

const selectRaw = (state) => state.reserv.form;

const selectOwnerPets = createSelector([selectRaw], (raw) => raw.owner);

const selectors = {
  selectOwnerPets,
};

export default selectors;
