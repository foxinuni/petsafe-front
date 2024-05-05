import { createSelector } from 'reselect';

const selectRaw = (state) => state.pets.form;

const selectPet = createSelector([selectRaw], (raw) => raw.pet);

const selectFindLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.findLoading,
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.saveLoading,
);

const selectTypes = createSelector([selectRaw], (raw) => raw.types);

const selectBreeds = createSelector([selectRaw], (raw) => raw.breeds);

const selectUsers = createSelector([selectRaw], (raw) => raw.users);

const selectors = {
  selectFindLoading,
  selectSaveLoading,
  selectPet,
  selectRaw,
  selectUsers,
  selectTypes,
  selectBreeds,
};

export default selectors;
