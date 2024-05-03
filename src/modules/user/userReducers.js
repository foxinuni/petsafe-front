import list from 'modules/user/list/userListReducers';
import form from 'modules/user/form/userFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
