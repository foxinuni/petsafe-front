import { createSelector } from 'reselect';

const selectRaw = (state) => state.reserv.form;

const selectOwnerPets = createSelector([selectRaw], (raw) => raw.pets);

const selectStates = createSelector([selectRaw], (raw) => raw.states);

const selectUsers = createSelector([selectRaw], (raw) => raw.owners);

const selectOnwer = createSelector([selectRaw], (raw) => raw.owner);

const selectors = {
  selectOwnerPets,
  selectStates,
  selectOnwer,
  selectUsers,
};

export default selectors;
