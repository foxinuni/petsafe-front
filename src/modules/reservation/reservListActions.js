import service from 'modules/reservation/reservService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import paginationSelectors from 'modules/shared/pagination/paginationSelectors';

const prefix = 'RESERV_LIST';

export const selectors = paginationSelectors('reserv.list');

const paginationActions = paginationAction(prefix, service.getAll, selectors);

export default {
  ...paginationActions,
};
