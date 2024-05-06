import service from 'modules/pet/petService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import paginationSelectors from 'modules/shared/pagination/paginationSelectors';

const prefix = 'PET_LIST';

export const selectors = paginationSelectors('pets.list');

const paginationActions = paginationAction(
  prefix,
  service.fetchPets,
  selectors,
);

export default {
  ...paginationActions,
};
