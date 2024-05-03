import service from 'modules/user/userService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import selectors from 'modules/user/list/userListSelectors';

const prefix = 'USER_LIST_USERS';

const paginationActions = paginationAction(
  prefix,
  service.fetchUsers,
  selectors,
);

export default {
  ...paginationActions,
};
