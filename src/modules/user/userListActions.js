import service from 'modules/user/userService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import paginationSelectors from 'modules/shared/pagination/paginationSelectors';

const prefix = 'USER_LIST_USERS';

export const selectors = paginationSelectors('user.list');

const paginationActions = paginationAction(
  prefix,
  service.fetchUsers,
  selectors,
);

export default {
  ...paginationActions,
};
