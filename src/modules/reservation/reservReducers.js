import form from 'modules/reservation/form/reservFormReducers';
import actions from 'modules/reservation/reservListActions';
import paginationReducer from 'modules/shared/pagination/paginationReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  list: paginationReducer(actions),
  form,
});
