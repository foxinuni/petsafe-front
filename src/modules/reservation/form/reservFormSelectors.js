import { createSelector } from 'reselect';

const selectRaw = (state) => state.reserv.form;

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.saveLoading,
);

const selectReservation = createSelector([selectRaw], (raw) => raw.reservation);

const selectStates = createSelector([selectRaw], (raw) => raw.states);

const selectOnwer = createSelector([selectRaw], (raw) => raw.owner);

const selectPet = createSelector([selectRaw], (raw) => raw.pet);

const selectFee = createSelector([selectRaw], (raw) => raw.fee);

const selectUsers = createSelector([selectRaw], (raw) => raw.owners);

const selectors = {
  selectSaveLoading,
  selectReservation,
  selectPet,
  selectStates,
  selectOnwer,
  selectFee,
  selectUsers,
};

export default selectors;
