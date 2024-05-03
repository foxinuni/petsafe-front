import service from 'modules/user/userService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import selectors from 'modules/user/list/userListSelectors';
import exporterFields from 'modules/user/list/userListExporterFields';

const prefix = 'USER_LIST_USERS';

const paginationActions = paginationAction(
  prefix,
  service.fetchUsers,
  selectors,
  'archivo_usuarios',
  exporterFields,
);

const actions = {
  CHANGE_STATUS_SELECTED_STARTED: `${prefix}_CHANGE_STATUS_SELECTED_STARTED`,
  CHANGE_STATUS_SELECTED_SUCCESS: `${prefix}_CHANGE_STATUS_SELECTED_SUCCESS`,
  CHANGE_STATUS_SELECTED_ERROR: `${prefix}_CHANGE_STATUS_SELECTED_ERROR`,
};
export default {
  ...paginationActions,
  ...actions,
};
