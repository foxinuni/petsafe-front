import form from 'modules/pet/form/petFormReducers';
import paginationReducer from 'modules/shared/pagination/paginationReducer';
import actions from 'modules/pet/petListActions';
import { combineReducers } from 'redux';

export default combineReducers({
  list: paginationReducer(actions),
  form,
});
