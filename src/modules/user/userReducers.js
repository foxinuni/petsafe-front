import form from 'modules/user/form/userFormReducers';
import paginationReducer from 'modules/shared/pagination/paginationReducer';
import actions from 'modules/user/userListActions';
import { combineReducers } from 'redux';

export default combineReducers({
  list: paginationReducer(actions),
  form,
});
